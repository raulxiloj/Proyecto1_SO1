#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <linux/sched/signal.h>
#include <linux/sched.h>
#include <linux/fs.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Raul Xiloj");
MODULE_DESCRIPTION("Simple CPU module");

struct task_struct *task;           //Estructura definida en sched.h para tareas/procesos 
struct task_struct *task_child;     //Estructura para iterar a traves de tareas secundarias
struct list_head *list;             //Estructura para recorrer la lista de cada tarea-> estructura de hijos 

static int proc_cpu_msg(struct seq_file * file, void *v){
    int running = 0, sleeping = 0, zombie = 0, stopped = 0;
    seq_printf(file, "{\n\"processes\":[ ");
    for_each_process(task){//Marco para iterar a traves de cada tarea en SO
        seq_printf(file, "{");
        seq_printf(file,"\"pid\":%d,\n",task->pid);
        seq_printf(file,"\"name\":\"%s\",\n",task->comm);
        //seq_printf(file, "\"user\": %d\n",task->cred->uid);
        seq_printf(file,"\"state\":%ld\n",task->state);
        switch(task->state){
            case 0:
                running++;
                break;
            case 1:
            case 1026:
                sleeping++;
                break;
            case 4:
                zombie++;
                break;
            case 5:
                stopped++;
                break;
            default:
                break;
        }
        seq_printf(file, "},\n");
    }
    seq_printf(file, "],\n");
    seq_printf(file, "\"running\":%d,\n",running);
    seq_printf(file, "\"sleeping\":%d,\n",sleeping);
    seq_printf(file, "\"zombie\":%d,\n",zombie);
    seq_printf(file, "\"stopped\":%d,\n",stopped);
    seq_printf(file, "\"total\":%d\n",(running+sleeping+zombie+stopped));
    seq_printf(file,"}\n");
    return 0;
}

static int my_open(struct inode *inode,struct file * file){
    return single_open(file,proc_cpu_msg,NULL);
}

static struct file_operations ops = {
    .open = my_open,
    .read = seq_read,
};

static int start(void){
    proc_create("cpu_201612113",0,NULL,&ops);
    printk(KERN_INFO "Cargando modulo...\n");
    printk(KERN_INFO "Raul Xiloj\n");
    return 0;
}


static void __exit finish(void){
    remove_proc_entry("cpu_201612113",NULL);
    printk(KERN_INFO "Removiendo modulo cpu...\n");
    printk(KERN_INFO "Diciembre 2020\n");
}

module_init(start);
module_exit(finish);
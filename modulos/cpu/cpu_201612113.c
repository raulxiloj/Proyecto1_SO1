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
    seq_printf(file, "[ ");
    for_each_process(task){//Marco para iterar a traves de cada tarea en SO
        seq_printf(file, "{");
        seq_printf(file,"\"pid\":%d,\n",task->pid);
        seq_printf(file,"\"name\":\"%s\",\n",task->comm);
        //seq_printf(file, "\"user\": %d\n",task->cred->uid);
        seq_printf(file,"\"state\":%ld,\n",task->state);
        seq_printf(file,"\"children:\": [");
        list_for_each(list, &task->children){//Macro para iterar a traves de la tarea->hijos
            //seq_printf(file,"{");
            task_child = list_entry(list, struct task_struct, sibling);
            seq_printf(file, "%d,", task_child->pid);
            //seq_printf(file,"\"pid\":%d,",task_child->pid);
            //seq_printf(file,"\"name\":\"%s\",",task_child->comm);
            //seq_printf(file,"\"state\":%ld",task_child->state);
            //seq_printf(file,"},\n");
        }
        seq_printf(file,"]");
        seq_printf(file, "},\n");
    }
    seq_printf(file, "]\n");
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
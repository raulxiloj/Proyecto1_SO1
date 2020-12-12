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

static int proc_cpu_msg(struct seq_file * archivo, void *v){
    seq_printf(archivo,"------------------------------------------\n");
    seq_printf(archivo,"Laboratorio de Sistemas Operativos 1\n");
    seq_printf(archivo,"Proyecto 1 - Modulo: CPU\n");
    seq_printf(archivo,"Raul Xiloj\n");
    seq_printf(archivo,"------------------------------------------\n");
    return 0;
}

static int my_open(struct inode *inode,struct file * file){
    return single_open(file,proc_cpu_msg,NULL);
}

static struct file_operations ops = {
    .open = my_open,
    .read = seq_read,
};

static int __init cpu_init_(void){
    proc_create("cpu_201612113",0,NULL,&ops);
    printk(KERN_INFO "Cargando modulo...\n");
    printk(KERN_INFO "201612113 Raul Xiloj\n");

    for_each_process(task){//Marco para iterar a traves de cada tarea en SO
        printk(KERN_INFO "\n PADRE PID: %d PROCESO: %s ESTADO: %ld",task->pid,task->comm,task->state);
        list_for_each(list, &task->children){//Macro para iterar a traves de la tarea->hijos
            task_child = list_entry(list, struct task_struct, sibling);
            printk(KERN_INFO "\n HIJO DE %s[%d] PID: %d PROCESO: %s ESTADO: %ld",task->comm, task->pid,task_child->pid,task_child->comm, task_child->state);
        }
        printk("----------------------------------------------------------------------------------------");
    }
    return 0;
}


static void __exit cpu_exit(void){
    remove_proc_entry("cpu_201612113",NULL);
    printk(KERN_INFO "Removiendo modulo...\n");
}

module_init(cpu_init_);
module_exit(cpu_exit);


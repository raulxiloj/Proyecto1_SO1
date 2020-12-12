#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <linux/sched/signal.h>
#include <linux/sched.h>
#include <linux/fs.h>
#include <linux/mm.h>

#define BUFSIZE 150

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Raul Xiloj");
MODULE_DESCRIPTION("Simple RAM module");

struct sysinfo inf;

static int proc_ram_data(struct seq_file * archivo, void *v){
    si_meminfo(&inf);
    long total_memoria = (inf.totalram);
    long memoria_libre = (inf.freeram);
    seq_printf(archivo,"*------------------------------------------*\n");
    seq_printf(archivo,"*Laboratorio de Sistemas Operativos 1      *\n");
    seq_printf(archivo,"*Proyecto 1 - Modulo: RAM                  *\n");
    seq_printf(archivo,"*Raul Xiloj                                *\n");
    seq_printf(archivo,"*------------------------------------------*\n");
    seq_printf(archivo,"Memoria total : \t %ld kB  -  %ld MB \n", total_memoria, total_memoria/1024);
    seq_printf(archivo,"Memoria libre : \t %ld kB  -  %ld MB \n", memoria_libre, memoria_libre/1024);
    //seq_printf(archivo,"Memoria en uso: \t %ld kB  -  %ld MB \n", total_memoria, total_memoria/1024);
    return 0;
}

static int my_open(struct inode *inode,struct file * file){
    return single_open(file,proc_ram_data,NULL);
}

static struct file_operations ops = {
    .open = my_open,
    .read = seq_read,
};

static int ram_init_(void){
    proc_create("memo_201612113",0,NULL,&ops);
    printk(KERN_INFO "Carnet: 201612113\n");
    return 0;
}

static void __exit ram_exit(void){
    remove_proc_entry("memo_201612113",NULL);
    printk(KERN_INFO "Removiendo modulo memo\n");
}

module_init(ram_init_);
module_exit(ram_exit);

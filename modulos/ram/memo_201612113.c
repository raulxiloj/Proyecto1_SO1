#include <linux/init.h>     //Needed by for the macros
#include <linux/module.h>   //Needed by all modules
#include <linux/kernel.h>   //Needed for KERN_INFO
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <linux/sched/signal.h>
#include <linux/sched.h>
#include <linux/fs.h>
#include <linux/mm.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Raul Xiloj");
MODULE_DESCRIPTION("Simple RAM module");

struct sysinfo inf;

static int proc_ram_data(struct seq_file * file, void *v){
    si_meminfo(&inf);
    unsigned long totalram = (inf.totalram*4);
    unsigned long freeram = (inf.freeram*4);
    seq_printf(file, "{\n");
    seq_printf(file,"\"total_memo\": %lu,\n",totalram/1024);
    seq_printf(file,"\"free_memo\": %lu,\n", freeram/1024);
    seq_printf(file,"\"used_memo\": %lu\n", ((totalram - freeram)*100)/totalram);
    seq_printf(file, "}\n");
    return 0;
}

static int my_open(struct inode *inode,struct file * file){
    return single_open(file,proc_ram_data,NULL);
}

static struct file_operations ops = {
    .open = my_open,
    .read = seq_read,
};

static int start(void){
    proc_create("memo_201612113",0,NULL,&ops);
    printk(KERN_INFO "Cargando modulo memoria...\n");
    printk(KERN_INFO "Carnet: 201612113\n");
    return 0;
}

static void __exit finish(void){
    remove_proc_entry("memo_201612113",NULL);
    printk(KERN_INFO "Removiendo modulo memo\n");
    printk(KERN_INFO "Sistemas Operativos 1\n");
}

module_init(start);
module_exit(finish);

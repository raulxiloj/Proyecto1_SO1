## Modulos

Comandos utilizados: 

Para compilar un modulo:
```
make all
```
*Este comando generara varios archivos entre los cuales esta el .ko que es el que se inserta en el kernel*

Para quitar los archivos luego de ya haberlo insertado
```
make clean
```

Para montar un modulo en el kernel:
```
sudo insmod <nombre_modulo>.ko
```
*Para ver que la insercion fue correcta se puede revisar el directorio /proc y ver que el modulo este ahi*

Para desmontar un modulo del kernel:
```
sudo rmmod <nombre_modulo>.ko
```

### Informacion extra
- https://tldp.org/LDP/lkmpg/2.6/html/
- https://stackoverflow.com/questions/17625429/how-to-create-proc-file-inside-kernel-module

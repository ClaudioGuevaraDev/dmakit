# dmakit

#### Comandos

* **Comando para compilar a escritorio:** pyinstaller --add-data "frontend/dist;frontend/dist" --noconsole --noconfirm main.py

#### Servicios

##### Vectoriales

- Visualización de datos y resumen de información
    - [x] Se debe permitir generar un resumen de la cantidad de datos en términos de filas y columnas 
    - [x] Se debe generar un resumen de los tipos de datos
    - [x] Se debe hacer histogramas y gráficos de frecuencia dependiendo sea el tipo
- Plots y visualización
    - [ ] La idea es habilitar una herramienta de plots, contemplando los siguientes:
        - [x] Gráficos de barra
        - [ ] Gráficos de torta
        - [x] Scatter plot
        - [ ] Log plots
        - [ ] 3D plots
        - [x] Line plots
        - [ ] Bubble chart
        - [ ] Parallel coordinates
        - [ ] Spiderweb
    - [ ] Para todos los plots se debe permitir guardar las figuras
    - [ ] También debe permitir agrupar o plotear con respecto a algo:
        - [ ] Scatter plot de A v/s B coloreado por columna C
- [ ] Estadísticas descriptivas
    - [ ] Se contempla una tabla resumen de los atributos continuos con los estadísticos básicos
    - [ ] Se contempla plot estadísticos
        - [ ] Histogramas
        - [ ] Boxplots
        - [ ] Heatmap
    - [ ] Debe permitir hacer análisis de correlación
        - [ ] Correlaciones simples
        - [ ] Mutual information
- [ ] Aplicación de test estadísticos
- [ ] Técnicas de procesamiento de datos
- [ ] Entrenamiento de modelos de clasificación por machine learning clásico
- [ ]  Entrenamiento de modelos de regresión por machine learning clásico
- [ ] Entrenamiento por métodos de regresión
- [ ] Métodos de clustering por machine learning clásico
- [ ] Uso de modelos predictivos desarrollados
- [ ] Técnicas de transformación
- [ ] Clustering por distancias
- [ ] Redes neuronales y Deep learning

##### Grafos

- [ ] Clustering de comunidades
- [ ] Descripción de grafos
- [ ] GCN y GNN

##### Imágenes

- [ ] Filtro
- [ ] Binarización
- [ ] Convolución

##### Series de Tiempo 

- [ ] Se debe permitir plotear las series de tiempo
- [ ] Clustering de series de tiempo (ver tslearn)
- [ ] Modelos predictivos de series de tiempo (ver tslearn)
- [ ] Modelos de pronóstico como autoregresión

##### Text Plano

- [ ] Modelos de sentimental análisis
- [ ] Desarrollo de autoencoders mediante word2vec o doc2vec (gensim libray)
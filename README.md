
"Nota: Si experimenta problemas de red local al conectar Expo Go con el servidor, el proyecto tiene configurado el soporte para túneles. Puede ejecutar la aplicación utilizando npx expo start --tunnel."
# Trabajo Práctico Integrador: Catálogo Personal de Medios

**Instituto Politécnico Formosa** **Tecnicatura Superior en Desarrollo de Software Multiplataforma** **Materia:** Taller de Lenguajes de Programación III - React Native  
**Alumno:** Sergio Agustín Rolón  

---

## Informe Teórico-Técnico

### Sección I: Introducción al Desarrollo Móvil Híbrido

**El framework React Native y su mecanismo de renderizado**
React Native es un framework desarrollado por Meta que permite construir aplicaciones móviles multiplataforma utilizando JavaScript y React. A diferencia de las soluciones híbridas más antiguas basadas en WebView (como Cordova o Ionic en sus primeras versiones), que esencialmente empaquetan una página web (HTML/CSS) dentro de un navegador oculto en la aplicación móvil, React Native funciona de manera fundamentalmente distinta. Este framework utiliza un "puente" (Bridge) que traduce el código JavaScript a los componentes nativos reales del sistema operativo (Java/Kotlin en Android, Objective-C/Swift en iOS). Esto garantiza un rendimiento, animaciones y una apariencia visual idénticos a los de una aplicación programada nativamente.

**El ecosistema Expo y sus ventajas operativas**
Expo es un conjunto de herramientas y servicios construidos alrededor de React Native que simplifican drásticamente el proceso de desarrollo. En un flujo de trabajo tradicional (React Native CLI), el desarrollador debe configurar entornos complejos con Android Studio o Xcode, gestionando dependencias nativas manualmente. Por el contrario, la CLI de Expo abstrae esta configuración, permitiendo ejecutar y compilar el proyecto puramente desde JavaScript. 
En este ecosistema, la aplicación móvil *Expo Go* cumple un rol vital: actúa como un cliente de prueba que permite escanear un código QR y reflejar instantáneamente los cambios del código en un dispositivo físico mediante "Hot Reloading", acelerando el ciclo de testeo iterativo sin necesidad de compilar la aplicación en cada paso.

---

### Sección II: Anatomía de Componentes Core y Optimización

**Mapeo de Componentes Core a la Web**
Para los desarrolladores familiarizados con el DOM estructurado de la web, los componentes *core* de React Native tienen equivalencias directas que facilitan la transición arquitectónica:
* **`<View>`**: Es el contenedor fundamental de la interfaz, equivalente a la etiqueta `<div>` en HTML. Se utiliza para agrupar otros elementos y aplicar estilos de diseño y posicionamiento.
* **`<Text>`**: Es el único componente capaz de renderizar cadenas de texto en pantalla, asimilándose a las etiquetas `<p>`, `<span>` o `<h1>` al `<h6>` de HTML.
* **`<TextInput>`**: Actúa como el campo de entrada de datos, siendo el equivalente directo de la etiqueta `<input type="text">` en HTML.

**Análisis Crítico de Rendimiento: FlatList vs ScrollView**
En el desarrollo de este catálogo, se implementó rigurosamente el componente `<FlatList>` en lugar de iterar un arreglo con un método `.map()` dentro de un `<ScrollView>` convencional. La justificación teórica radica en la gestión de memoria del dispositivo.
Un `ScrollView` renderiza todos sus elementos hijos al mismo tiempo; si el catálogo tuviera 500 películas, el motor intentaría dibujar las 500 en la memoria inmediatamente, provocando caídas de *frames* y cierres inesperados de la aplicación. 
Por el contrario, `<FlatList>` implementa el concepto de **renderizado perezoso (lazy rendering)**: solo dibuja en pantalla los elementos que son visibles actualmente para el usuario (y unos pocos elementos adyacentes). A medida que el usuario hace *scroll*, el componente aplica el **reciclaje de celdas en memoria**, destruyendo las vistas que salen de la pantalla y reutilizando esos espacios de memoria para renderizar los elementos nuevos que van apareciendo, garantizando una fluidez absoluta sin importar el tamaño del catálogo.

---

### Sección III: Gestión de Estados e Interactividad

**Reactividad con `useState`**
El estado en React es una estructura de datos que representa la información que la interfaz gráfica necesita mostrar y que puede cambiar con el tiempo. En JavaScript tradicional, mutar una variable (ej. `variable = nuevoValor`) no tiene ningún efecto en la interfaz visual, ya que el motor gráfico no tiene forma de saber que el valor interno cambió. 
El hook `useState` soluciona esto proporcionando una función modificadora (la función `set`, por ejemplo, `setCatalog` o `setTitle`). Al invocar esta función, no solo se actualiza el valor de la variable, sino que se dispara una señal al motor de React, forzando un *re-renderizado* del componente para que el *Virtual DOM* se sincronice y pinte la interfaz gráfica con la información actualizada.

**Control de Efectos con `useEffect`**
El hook `useEffect` es fundamental para manejar "efectos secundarios", es decir, operaciones que escapan al flujo síncrono del renderizado puro de React, como llamadas a APIs, suscripciones o manipulación del almacenamiento. Su comportamiento está dictado por su matriz de dependencias (el arreglo `[]` al final del hook): si está vacío, el efecto se ejecuta solo una vez al montar el componente; si contiene variables, se ejecutará cada vez que dichas variables muten.

En el contexto de la aplicación desarrollada, se implementó el hook `useEffect` en el componente principal de la aplicación (`App`) con una matriz de dependencias vacía (`[]`). El propósito específico de esta implementación fue la **depuración e inicialización del sistema**, permitiendo registrar en la consola el montaje exitoso del catálogo en memoria de forma controlada, ejecutándose una única vez al abrir la aplicación sin interferir con el ciclo de renderizado visual.

---

### Sección IV: Diseño y Flexbox en Dispositivos Móviles

**Comportamiento del Layout**
En React Native, todo el sistema de posicionamiento y diseño está fundamentado en Flexbox, una especificación que permite distribuir el espacio y alinear los componentes dentro de contenedores de manera dinámica. Permite crear interfaces que se adaptan automáticamente a los diferentes tamaños y resoluciones de las pantallas móviles (Responsive Design) utilizando propiedades como `justifyContent` y `alignItems`.

**Eje de Dirección por Defecto: Diferencia Crítica**
Existe una diferencia fundamental entre la especificación Flexbox de la web tradicional (CSS) y la implementada en React Native. 
En la web, la propiedad `flexDirection` viene configurada por defecto con el valor `row` (fila), apilando los elementos horizontalmente de izquierda a derecha. En React Native, para adaptarse a la ergonomía vertical y alargada de los teléfonos móviles, **`flexDirection` viene configurado por defecto con el valor `column` (columna)**. Esto significa que, si no se especifica lo contrario, los elementos hijos `View` o `Text` siempre se apilarán verticalmente de arriba hacia abajo.
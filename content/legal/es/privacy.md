> ⚠ Esta traducción se ha generado mediante IA y se ofrece únicamente con fines informativos. La versión oficial en inglés prevalece en caso de discrepancia.

# Política de Privacidad de CarFai

**Fecha de entrada en vigor**: 2026-05-20
**Última actualización**: 2026-05-20

Esta Política de Privacidad describe cómo **CarFai** («CarFai», «nosotros», «nos», «nuestro») recopila, utiliza, comparte y protege la información cuando usted utiliza la aplicación móvil de CarFai y cualquier servicio relacionado (colectivamente, el «Servicio»).

Al utilizar el Servicio, usted acepta la recopilación y el uso de la información de acuerdo con esta Política. Si no está de acuerdo, no utilice el Servicio.

## 1. Información que recopilamos

### 1.1 Información que usted proporciona directamente

- **Información de la cuenta**: dirección de correo electrónico, contraseña (almacenada como un hash nunca visible para nosotros), nombre de usuario, preferencia de idioma, país/región, foto de perfil opcional.
- **Identificadores de autenticación de proveedores externos**: cuando inicia sesión con Apple, Google o Microsoft, recibimos su nombre, correo electrónico y un identificador estable emitido por el proveedor. Nunca recibimos la contraseña de su proveedor.
- **Información del vehículo**: marca, modelo, año, versión, color, VIN, número de matrícula, kilometraje, precio/fecha de compra, estado, modificaciones, fotos opcionales. Para cuentas de flotas B2B: asignaciones de vehículos a la organización y conductores asignados.
- **Documentos**: facturas, documentos de matriculación, documentos del seguro, recibos de reparación y otros documentos relacionados con el vehículo que usted decida subir. Extraemos información estructurada (importe, proveedor, fecha, categoría) mediante procesamiento con IA, como se describe en la Sección 4.
- **Datos de suscripción**: su nivel y estado de suscripción, obtenidos de RevenueCat, que interactúa con la App Store de Apple / Google Play. **No** almacenamos los datos de su tarjeta de pago; estos son conservados únicamente por Apple/Google.
- **Comunicaciones**: comentarios, solicitudes de soporte y cualquier mensaje que nos envíe.

### 1.2 Información recopilada automáticamente

- **Datos de uso**: funciones a las que se ha accedido, pantallas vistas, tiempo en pantalla, eventos de error. Se utilizan para mejorar el producto y diagnosticar problemas. No creamos perfiles de publicidad conductual.
- **Información del dispositivo**: modelo del dispositivo, versión del sistema operativo, idioma, región, versión de la aplicación, operador de red móvil (aproximado).
- **Datos de fallos y rendimiento**: cuando la aplicación falla o tiene un problema de rendimiento, recopilamos un seguimiento de la pila y el contexto del dispositivo (no se incluyen datos de documentos o vehículos).
- **Datos de OBD2** (solo si conecta un adaptador Bluetooth OBD2 al Servicio): códigos de diagnóstico de problemas (DTC), lecturas de los sensores del motor, datos de viaje. Se almacenan en su dispositivo y (con su consentimiento) se sincronizan con nuestros servidores para análisis y para su uso por parte del AI Advisor.
- **Datos de conversación del AI Advisor**: las instrucciones que envía al AI Advisor dentro de la aplicación y las respuestas devueltas. Se utilizan para prestar el servicio y para mejorar la calidad de las instrucciones. Véase la Sección 4.

### 1.3 Información que NO recopilamos

- **No** solicitamos el GPS continuo / la ubicación precisa de su dispositivo. **No** pedimos ni utilizamos el permiso de ubicación de iOS / Android.
- Sin embargo, **los datos de viaje de OBD2 que usted decida sincronizar pueden contener indirectamente información que permita inferir la ubicación**. Los vehículos con OBD2 informan de las lecturas de los sensores (velocidad, consumo de combustible, RPM, delta de kilometraje) a lo largo del tiempo. Cuando se almacenan, esas series temporales pueden ser sometidas a ingeniería inversa para obtener una posición aproximada en el tiempo, aunque nunca consultemos el GPS. Si conecta un adaptador OBD2 y activa la sincronización de viajes, trate los datos sincronizados como si permitieran inferir la ubicación. Puede desactivar la sincronización de OBD2 en cualquier momento en Ajustes.
- **No** accedemos al micrófono ni a los contactos de su teléfono.
- **No** leemos sus SMS, correos electrónicos o aplicaciones de mensajería.
- **No** utilizamos el ID de publicidad de Android (`AD_ID`); el permiso está explícitamente bloqueado.

## 2. Cómo utilizamos la información

Utilizamos la información que recopilamos para:

- Proporcionar y mantener el Servicio, incluyendo la autenticación, la gestión de vehículos y documentos, y las funciones impulsadas por IA.
- Procesar las transacciones de suscripción y gestionar el estado de su suscripción.
- Enviar comunicaciones transaccionales (correo electrónico de bienvenida, recibos de suscripción, restablecimiento de contraseña, alertas de seguridad). No puede optar por no recibir estas comunicaciones sin perder el acceso al Servicio. No enviamos comunicaciones de marketing sin su consentimiento explícito.
- Diagnosticar problemas técnicos y mejorar la calidad del producto (informes de fallos, análisis de uso anonimizados).
- Cumplir con las obligaciones legales y responder a las solicitudes gubernamentales válidas.
- Detectar, prevenir y responder al fraude, los incidentes de seguridad y el abuso.

**No** vendemos su información personal a terceros. **No** utilizamos sus datos para entrenar modelos de IA de terceros en nuestro nombre; véase la Sección 4.

## 3. Encargados del tratamiento de terceros (subencargados)

El Servicio se basa en varios encargados del tratamiento de terceros. Cada uno está sujeto a obligaciones contractuales de protección de datos coherentes con esta Política. La lista a fecha de entrada en vigor es:

| Encargado | Finalidad | Datos compartidos | Región | Enlace de privacidad |
|---|---|---|---|---|
| **Anthropic, PBC** | Procesamiento de IA (API de Claude) para el AI Advisor, clasificación de documentos, recomendaciones de mantenimiento | Metadatos del vehículo, texto/imágenes de documentos, instrucciones de conversación, lecturas de OBD2 (cuando sean relevantes para una consulta) | Estados Unidos | https://www.anthropic.com/legal/privacy |
| **Supabase Inc.** | Base de datos, autenticación, almacenamiento (su cuenta, vehículos, documentos) | Todos los datos descritos en la Sección 1, excepto los datos de la tarjeta de pago | Estados Unidos (región aprovisionada a fecha de 2026-05-20) | https://supabase.com/privacy |
| **RevenueCat, Inc.** | Gestión del estado de la suscripción (interactúa con Apple/Google) | Nivel de suscripción, historial de compras, un ID opaco que le vincula a Apple/Google | Estados Unidos | https://www.revenuecat.com/privacy |
| **Resend Inc.** | Entrega de correos electrónicos transaccionales (bienvenida, recibos, restablecimiento de contraseña) | Dirección de correo electrónico, preferencia de idioma, contenido transaccional | Estados Unidos | https://resend.com/legal/privacy-policy |
| **Sentry (Functional Software, Inc.)** | Informes de fallos y errores (móvil + funciones edge) | Trazas de pila, contexto del dispositivo, identificador de usuario opaco — nunca datos de documentos o vehículos | Estados Unidos | https://sentry.io/privacy/ |
| **PostHog Inc.** | Análisis de producto (pantallas vistas, tiempo en pantalla, eventos de activación) | Eventos de uso anonimizados, identificador de usuario opaco | Estados Unidos | https://posthog.com/privacy |
| **Apple Inc.** | Distribución en la App Store, procesamiento de compras dentro de la aplicación (iOS) | Estado de la suscripción, eventos de IAP; los datos de la tarjeta de pago permanecen en poder de Apple | Estados Unidos | https://www.apple.com/legal/privacy/ |
| **Google LLC** | Distribución en la Play Store, procesamiento de facturación de Play (Android), inicio de sesión con OAuth | Estado de la suscripción, eventos de IAP, identidad de OAuth (si se utiliza); los datos de la tarjeta de pago permanecen en poder de Google | Estados Unidos | https://policies.google.com/privacy |
| **Microsoft Corp.** | Inicio de sesión con OAuth (si se utiliza) | Identidad de OAuth | Estados Unidos | https://privacy.microsoft.com |

Le notificaremos (por correo electrónico y mediante un banner en la aplicación) al menos 30 días antes de añadir cualquier subencargado que trate sus Datos Personales, dándole la oportunidad de cancelar su cuenta antes de que el cambio entre en vigor.

## 4. Procesamiento con IA: divulgación especial

CarFai utiliza **Claude de Anthropic** (un modelo de lenguaje grande) para potenciar:
- El AI Advisor (preguntas sobre su vehículo, recomendaciones de mantenimiento, análisis de valoración).
- La clasificación de documentos y la extracción estructurada (cuando escanea un recibo, una factura o un documento de matriculación).
- La generación del calendario de mantenimiento.
- El análisis de múltiples vehículos / flotas (niveles B2B).

Cuando utiliza estas funciones:
- Enviamos a Anthropic el contexto relevante: su pregunta, los metadatos del vehículo (marca/modelo/año/kilometraje, etc.), el contenido del documento (texto e imágenes) y las lecturas de OBD2 cuando sean pertinentes para su consulta.
- Anthropic procesa la solicitud bajo sus **Términos para Clientes Comerciales**, que les prohíben utilizar los datos para entrenar sus modelos.
- **No** enviamos a Anthropic sus credenciales de autenticación, información de pago o datos de contacto (aparte de su ID de usuario opaco).
- Anthropic puede retener temporalmente las instrucciones y los resultados para la clasificación de seguridad, la detección de abusos y los diagnósticos operativos. Consulte la Política de Privacidad de Anthropic para obtener detalles sobre la retención.

**Los resultados del AI Advisor son generados por IA y pueden ser incorrectos, incompletos o estar desactualizados.** Trátelos como una guía informativa, no como un asesoramiento profesional. Consulte `/ai-disclosure` para ver la advertencia completa.

### 4.1 Estrategia de datos de tres capas para las funciones de IA

Cuando el AI Advisor responde a una pregunta (especialmente una pregunta sobre valor, coste o comparación), se basa en TRES capas de datos distintas en orden de prioridad:

1. **Sus propios datos del vehículo** — los metadatos del vehículo, los documentos, las lecturas de OBD2 y el historial de conversaciones que usted ha añadido personalmente a CarFai. Es la señal de mayor calidad y está totalmente bajo su control. Se almacena en su cuenta privada; nunca se comparte con otros usuarios.

2. **Parámetros de referencia anónimos de la comunidad** — estadísticas agregadas de todos los usuarios de CarFai con la misma marca/modelo/año/región. Ejemplos: precio medio de compra, coste medio del seguro, intervalo de mantenimiento típico. Se obtienen a través de funciones SQL SECURITY DEFINER (`get_carfai_market_data`, `get_carfai_financial_benchmark`) que **devuelven solo agregados** — nunca filas individuales, precios o identificadores de usuario. **Estándar de anonimización**: [JURISDICTION-SPECIFIC: Por determinar — se definirá según la sección 28 de la Quebec Law 25; marcador de posición pendiente de la P5 en `docs/legal/REVIEW_FINDINGS_2026-05-09.md`. Probablemente k-anonimato con un tamaño mínimo de cohorte de agregación.] Usted NO PUEDE ser reidentificado a partir de una respuesta de referencia.

3. **Contenido de búsqueda web** (cuando sea relevante) — para un contexto sensible al tiempo (p. ej., precios actuales del combustible, retiradas recientes del mercado, cambios en el mercado), el AI Advisor puede recuperar un pequeño número de páginas web públicas a través de [Por determinar — servicio de búsqueda según la P8]. El contenido obtenido se trata como una entrada no fiable (según las defensas contra la inyección de instrucciones de la Sección L.2) y nunca se escribe en su cuenta de CarFai.

Puede optar por no contribuir a la capa de parámetros de referencia de la comunidad (n.º 2) en cualquier momento en Ajustes → Privacidad. Sus datos se excluirán de futuras consultas de referencia en la medida de lo posible (las instantáneas existentes en las cachés de referencia caducan en 30 días).

### 4.2 Parámetros de referencia anónimos de la comunidad: qué se comparte

Si **no** ejerce su derecho de exclusión, CarFai utiliza los metadatos de su vehículo + los campos financieros para calcular estadísticas agregadas que otros usuarios que consulten la misma marca/modelo/año/región pueden leer. Específicamente:

| Campo utilizado en los agregados | Qué se comparte |
|---|---|
| Marca, Modelo, Año, País | Se utiliza como clave de la cohorte; no es visible por sí solo |
| `purchase_price`, `purchase_date` | Agregado en la mediana/media/mín/máx para la cohorte |
| `current_mileage` | Agregado en la media para la cohorte |
| `monthly_insurance`, `monthly_loan_payment`, `monthly_parking`, `monthly_fuel_estimate`, `yearly_registration_fee` | Cada uno agregado por separado en la mediana/media para la cohorte |
| `reliability_rating` | Agregado en la media |

Los resultados se devuelven como un JSON agregado como `{ avg_price, median_price, sample_size, ... }`. Sus valores individuales nunca se exponen en las respuestas de la API.

### 4.3 Puntuación del rendimiento de los gestores (cuentas de flotas B2B)

La puntuación del rendimiento de los gestores **no es una función de CarFai v1**. Si se introduce en una versión futura, esta Política se actualizará con la especificación del algoritmo, el aviso de decisión automatizada de la sección 12.1 de la Quebec Law 25 y el flujo de solicitud de revisión humana antes de que la función se habilite para cualquier cuenta B2B.

### 4.4 Derecho a solicitar la revisión humana de las decisiones de la IA

Para los usuarios de Quebec (Quebec Law 25, s. 12.1) y del EEE / Reino Unido (GDPR, art. 22), usted tiene derecho a no ser objeto de una decisión basada únicamente en el tratamiento automatizado que produzca efectos jurídicos en usted o le afecte significativamente de modo similar. Los resultados del AI Advisor en CarFai son **informativos** (recomendaciones, valoraciones, sugerencias de mantenimiento); no son decisiones legalmente vinculantes. Sin embargo, si cree que un resultado del AI Advisor afectó materialmente una decisión que usted tomó, puede solicitar una revisión humana contactando a carfai.info@gmail.com con el identificador del análisis (visible en la parte inferior de cada resultado de Análisis Detallado).

Responderemos en un plazo de 30 días. La revisión la realiza el personal de CarFai (el fundador, en la v1; el equipo de soporte posteriormente).

## 5. Bases jurídicas para el tratamiento (GDPR / GDPR del Reino Unido / LPD suiza)

Para los usuarios del EEE / Reino Unido / Suiza, las bases jurídicas en las que nos basamos son:
- **Ejecución de un contrato**: para gestionar su cuenta y proporcionarle las funciones que ha solicitado.
- **Intereses legítimos**: para diagnosticar fallos, mejorar la calidad del producto y prevenir el fraude. Sopesamos estos intereses con sus derechos fundamentales y ofrecemos la posibilidad de exclusión cuando sea razonable.
- **Consentimiento**: para cualquier función opcional que lo requiera (p. ej., activar la sincronización de viajes de OBD2).
- **Cumplimiento de obligaciones legales**: para responder a procesos legales válidos.

Puede retirar su consentimiento para el tratamiento basado en el consentimiento en cualquier momento, sin que ello afecte a la licitud del tratamiento previo.

## 6. Conservación de datos

| Categoría de datos | Conservación |
|---|---|
| Información de la cuenta | Mientras la cuenta esté activa + 30 días después de la solicitud de eliminación, luego se eliminan permanentemente (con purga de las copias de seguridad en un plazo adicional de 30 días) |
| Datos de vehículos y documentos | Mientras la cuenta esté activa + 30 días después de la solicitud de eliminación |
| Historial de suscripciones | 7 años (cumplimiento fiscal / contable) |
| Registros de conversaciones de IA | 90 días (luego se eliminan, excepto las estadísticas de uso agregadas no identificables) |
| Datos de fallos y rendimiento | 90 días |
| Comunicaciones con el soporte | 3 años (garantía / resolución de disputas) |
| Registros de auditoría (seguridad, acciones de la organización B2B) | 2 años |

Puede solicitar la eliminación inmediata de su cuenta y sus datos en cualquier momento a través del flujo «Eliminar cuenta» dentro de la aplicación (Sección 7).

## 7. Sus derechos

Dependiendo de su jurisdicción, usted tiene algunos o todos los siguientes derechos:

- **Acceso**: solicitar una copia de los datos personales que tenemos sobre usted. Disponible en la aplicación a través de «Exportar mis datos» (devuelve un paquete JSON firmado).
- **Rectificación**: corregir datos inexactos. La mayoría de los campos son editables en la aplicación; para los que no lo son, póngase en contacto con nosotros.
- **Supresión («derecho al olvido»)**: eliminar su cuenta y sus datos. Disponible en la aplicación a través de «Eliminar cuenta».
- **Limitación**: limitar temporalmente nuestro tratamiento mientras se resuelve una disputa.
- **Portabilidad**: recibir sus datos en un formato legible por máquina (el paquete de «Exportar mis datos» es JSON).
- **Oposición**: oponerse al tratamiento basado en intereses legítimos.
- **Retirada del consentimiento**: para cualquier tratamiento basado en el consentimiento.
- **A no ser objeto de decisiones exclusivamente automatizadas con efectos jurídicos**: no tomamos decisiones exclusivamente automatizadas que tengan efectos jurídicos o significativamente similares sobre usted. El AI Advisor proporciona información, no decisiones legalmente vinculantes.
- **Presentar una reclamación ante una autoridad de control**: su regulador local de protección de datos (p. ej., la ICO en el Reino Unido, la CNIL en Francia, el CEPD en la UE).

**Residentes de California (CCPA/CPRA)** también tienen derecho a saber qué categorías de información personal se recopilan, las categorías de fuentes, los fines del uso y las categorías de terceros con los que se comparten los datos (cubierto anteriormente), y el derecho a oponerse a la «venta» o «intercambio» de información personal. **CarFai no vende ni comparte información personal para publicidad conductual de contexto cruzado.** Puede confirmar esto y ejercer el correspondiente derecho de exclusión en cualquier momento desde **Ajustes → Acerca de → No vender ni compartir mi información personal**.

**Residentes de otros estados de EE. UU. (añadido el 2026-05-18 — M1.10)** — Texas (TDPSA, ef. 2024), Colorado (CPA), Connecticut (CTDPA), Virginia (VCDPA), Utah (UCPA), Oregón (OCPA), Montana (MTCDPA), Indiana (INCDPA), Tennessee (TIPA), Iowa (ICDPA), Delaware (DPDPA), Nuevo Hampshire (NHPA), Nueva Jersey (NJDPL) y otras leyes estatales integrales de privacidad confieren sustancialmente los mismos derechos que la base de la UE anterior: acceso, supresión, corrección, portabilidad y exclusión voluntaria de la publicidad dirigida / venta / elaboración de perfiles para decisiones significativas. **CarFai no realiza publicidad dirigida, no vende información personal y no utiliza información personal para la elaboración de perfiles con efectos jurídicos o significativamente similares.** Para ejercer cualquiera de estos derechos, póngase en contacto con carfai.info@gmail.com o utilice la entrada de la aplicación **Ajustes → Acerca de → No vender ni compartir mi información personal**.

**PDPL de los EAU / PDPL de Arabia Saudí / DPL de Egipto**: se aplican derechos equivalentes de acceso, rectificación, supresión y oposición. Cumplimos con los requisitos de la autoridad de control local de cada país.

Para ejercer cualquier derecho, póngase en contacto con carfai.info@gmail.com. Respondemos en un plazo de 30 días (o el período requerido por la ley de su jurisdicción si es más corto).

## 8. Transferencias internacionales de datos

Los servidores principales de CarFai se encuentran en **Estados Unidos** (región us-east-1, a través de Supabase) y la API de Anthropic también está alojada en EE. UU. Si accede al Servicio desde fuera de los Estados Unidos, sus datos serán transferidos y tratados en los EE. UU.

Para los usuarios del EEE / Reino Unido / Suiza, nos basamos en:
- Las **Cláusulas Contractuales Tipo (CCT)** de la Comisión Europea con nuestros subencargados de EE. UU., complementadas con las medidas técnicas y organizativas adecuadas.
- El **Anexo del Reino Unido** a las CCT para los interesados del Reino Unido.
- La evaluación equivalente de la **LPD suiza**.

Actualmente, CarFai utiliza exclusivamente infraestructura ubicada en EE. UU. Si en el futuro aprovisionamos una infraestructura regional dedicada en la UE, esta Política se actualizará y los usuarios del EEE serán dirigidos en consecuencia.

## 9. Seguridad

Implementamos medidas técnicas y organizativas razonables y apropiadas a la sensibilidad de los datos, incluyendo:
- Cifrado en tránsito (TLS 1.2+) y en reposo (cifrado gestionado por el proveedor en Supabase).
- Seguridad a nivel de fila (RLS) en todos los datos multiinquilino; los usuarios solo pueden acceder a sus propios datos y (en modo B2B) a los datos de su organización según los controles de acceso basados en roles.
- Acceso a producción registrado y auditado; secretos rotados según `docs/SECRETS_ROTATION.md`.
- Revisión de seguridad previa al lanzamiento y escaneo continuo de vulnerabilidades en las dependencias.
- Diseñado contra los riesgos del Top 10 de OWASP para móviles.

Ningún control de seguridad es perfecto. Si tenemos conocimiento de una violación de la seguridad de los datos personales que afecte a sus datos, se lo notificaremos a usted y a la autoridad de control pertinente en los plazos exigidos por la ley (72 horas en virtud del GDPR para las violaciones de alto riesgo).

## 10. Privacidad de los menores

CarFai **no está dirigido a menores de 13 años** (o la edad de consentimiento equivalente en su jurisdicción). No recopilamos conscientemente información personal de menores de esa edad. Si cree que un menor nos ha proporcionado información personal, póngase en contacto con nosotros y la eliminaremos.

## 11. Cookies (solo web)

La aplicación móvil de CarFai no utiliza cookies. El sitio web de marketing de CarFai (`carfai.app` y cualquier subdominio) utiliza cookies esenciales para el funcionamiento del sitio. Consulte la Política de Cookies independiente en `https://carfai.app/cookies`.

## 12. Enlaces de terceros

El Servicio puede contener enlaces a sitios web de terceros (p. ej., a la gestión de suscripciones de Apple/Google). No somos responsables de las prácticas de privacidad de esos sitios. Revise sus políticas por separado.

## 13. Cambios en esta Política

Podemos actualizar esta Política de vez en cuando. La fecha de «Última actualización» en la parte superior reflejará cualquier cambio. Para cambios materiales que afecten a sus derechos, le notificaremos por correo electrónico y le solicitaremos que vuelva a aceptar la política en la aplicación antes de continuar utilizando el Servicio.

## 14. Contacto

- **Consultas generales sobre privacidad**: carfai.info@gmail.com
- **Delegado de Protección de Datos (GDPR)**: carfai.info@gmail.com
- **Dirección postal**: `CarFai, dirección disponible bajo petición a través de carfai.info@gmail.com`
- **Representante en el EEE (artículo 27 del GDPR)**: aún no designado. Los interesados del EEE pueden ponerse en contacto con CarFai directamente en carfai.info@gmail.com para cualquier consulta sobre privacidad.
- **Representante en el Reino Unido (artículo 27 del GDPR del Reino Unido)**: aún no designado. Los interesados del Reino Unido pueden ponerse en contacto con CarFai directamente en carfai.info@gmail.com para cualquier consulta sobre privacidad.

---

## Historial de revisiones

| Versión | Fecha | Notas |
|---|---|---|
| v1 | 2026-05-20 | Publicación inicial. |

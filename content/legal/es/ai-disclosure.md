> ⚠ Esta traducción se ha generado mediante IA y se ofrece únicamente con fines informativos. La versión oficial en inglés prevalece en caso de discrepancia.

# Declaración sobre IA de CarFai

> ⚠️ **BORRADOR v0 — NO PUBLICAR.** Solo para revisión legal.

**Fecha de entrada en vigor**: 2026-05-20

Esta Declaración sobre IA complementa la Política de Privacidad y los Términos de Servicio de CarFai. Explica cómo CarFai utiliza la inteligencia artificial y los límites que debe tener en cuenta.

## 1. Usamos Anthropic Claude

CarFai utiliza **Claude**, un sistema de IA desarrollado por **Anthropic, PBC**, para potenciar varias funciones:

| Función | Qué hace Claude |
|---|---|
| AI Advisor (chat) | Responde a preguntas sobre su vehículo en lenguaje natural |
| AI Advisor (Análisis Detallado) | Genera análisis estructurados: puntuación de estado, recomendaciones, KPI |
| Escáner de documentos | Lee facturas, recibos, documentos de matriculación y extrae campos estructurados (importe, proveedor, fecha, categoría) |
| Calendario de mantenimiento | Genera un calendario de servicio de 12 meses basado en su vehículo y uso |
| Análisis de múltiples vehículos / flotas (B2B) | Información intervehicular para operadores de flotas |
| Valoración de vehículos (cuando se implemente) | Estima el valor de reventa combinando datos de múltiples usuarios y señales del mercado |

## 2. Qué enviamos a Claude

Para cada solicitud de IA, enviamos a Claude:
- **Metadatos del vehículo que ha introducido** (marca, modelo, año, kilometraje, etc.)
- **Contenido del documento** (texto + imagen cuando escanea un documento) — solo el documento sobre el que está actuando
- **Su pregunta o instrucción específica**
- **Lecturas recientes de OBD2** (cuando sea relevante para una consulta de mantenimiento o diagnóstico)
- **Un ID de usuario opaco** (un UUID — no su nombre, correo electrónico, teléfono o dirección)

**No** enviamos a Claude:
- Su contraseña o cualquier credencial de autenticación
- La información de su tarjeta de pago (CarFai nunca tiene acceso a esta)
- Sus contactos, biblioteca de fotos, micrófono o ubicación
- Datos de otros usuarios — cada solicitud se limita únicamente a sus datos (B2B: se limita a su organización según su rol)

## 3. Cómo utiliza Anthropic sus datos

Anthropic procesa nuestras solicitudes bajo los **Términos para Clientes Comerciales**. Bajo dichos términos:
- Anthropic **no** entrena sus modelos con los datos de nuestros clientes.
- Anthropic puede retener temporalmente las instrucciones y los resultados para la clasificación de seguridad, la detección de abusos y los diagnósticos operativos.
- La retención estándar es de hasta 30 días para los registros operativos, con una retención más corta para el contenido de la instrucción en sí.

Para conocer las prácticas de privacidad completas de Anthropic, consulte https://www.anthropic.com/legal/privacy.

## 4. Los resultados de la IA no son asesoramiento — advertencias importantes

**El AI Advisor produce contenido informativo, no asesoramiento profesional.**

Los resultados generados por la IA pueden:
- **Contener errores fácticos** ("alucinaciones") que parecen fidedignos.
- **Estar desactualizados** con respecto a retiradas del mercado, regulaciones, precios o problemas específicos del modelo.
- **Omitir excepciones específicas del vehículo** (una respuesta genérica que no se aplica a su versión, región o año de modelo específicos).
- **Ser sesgados** en función de los datos de entrenamiento y la forma en que formula una pregunta.

**No confíe en el AI Advisor como única base para:**
- Decisiones sobre la seguridad en la conducción ("¿es seguro conducir este coche?")
- Asesoramiento médico, legal, financiero, fiscal o de seguros
- Valoraciones de vehículos para compra, venta, permuta o seguros
- Decisiones en las que un error podría causar un daño o pérdida material

**Verifique siempre** las respuestas del AI Advisor con:
- El manual del propietario de su vehículo y los boletines de servicio del fabricante
- Un mecánico cualificado para cuestiones de seguridad o mecánicas
- Fuentes regulatorias autorizadas (EPA, NHTSA o equivalentes en su país) para cuestiones regulatorias
- Un tasador, contable, abogado o asesor financiero licenciado para valoraciones y otros asuntos profesionales

## 5. Descargo de responsabilidad sobre la valoración de vehículos

**[PRÓXIMAMENTE CUANDO SE LANCE LA FUNCIÓN DE VALORACIÓN — ver RELEASE_PLAN.md Sección K]**

Cuando el AI Advisor estima el valor de un vehículo, el resultado es una **estimación** basada en:
- Precios de compra agregados de usuarios de CarFai con la misma marca/modelo/año
- Contexto de mercado obtenido de fuentes públicas
- Información sobre el estado del vehículo que usted proporciona (kilometraje, historial de daños, extras)

La estimación **no es una tasación formal**. Los precios de transacción reales pueden diferir sustancialmente. No utilice las valoraciones de la IA como única base para decisiones de venta, compra, seguro, financiación o fiscales.

## 6. Inyección de instrucciones y entradas adversarias

El AI Advisor está reforzado contra ataques comunes de inyección de instrucciones (separación de instrucciones de sistema/usuario, etiquetado de contenido no fiable, validación de resultados, preselección de patrones). A pesar de estas defensas, ningún sistema de IA es completamente inmune a las entradas adversarias. Si encuentra:
- Una respuesta de la IA que parezca filtrar datos de otro usuario
- Una respuesta que ignora sus instrucciones o se comporta de forma anómala
- Cualquier comportamiento inusual o alarmante

Por favor, infórmelo a carfai.info@gmail.com de inmediato. Tratamos dichos informes con seriedad y respondemos en un plazo de 24 horas.

## 7. Sus derechos en relación con el procesamiento de IA

- **Exclusión voluntaria (Opt-out)** — puede optar por no utilizar las funciones de IA no usando el AI Advisor / escáner. Las funciones del nivel gratuito que no dependen de la IA seguirán funcionando.
- **Supresión** — cuando elimina su cuenta, suprimimos su historial de conversaciones de IA según el calendario de retención de la Política de Privacidad.
- **Acceso** — su historial de conversaciones de IA se incluye en el paquete "Exportar mis datos" (Política de Privacidad §7).
- **Oposición al uso de IA** — en virtud del Artículo 22 del GDPR, tiene derecho a no ser objeto de decisiones basadas únicamente en el tratamiento automatizado que produzcan efectos jurídicos. Las funciones de IA de CarFai proporcionan información, no decisiones legalmente vinculantes; si tiene alguna preocupación específica, póngase en contacto con carfai.info@gmail.com.

## 8. Actualizaciones

Esta Declaración se actualizará a medida que evolucione nuestro uso de la IA (nuevas funciones, nuevos modelos, nuevos proveedores de IA de terceros). Los cambios sustanciales se notificarán por correo electrónico y requerirán una nueva aceptación.

## 9. Contacto

- Preguntas generales sobre IA: carfai.info@gmail.com
- Privacidad: carfai.info@gmail.com
- Seguridad: carfai.info@gmail.com

---

## Historial de revisiones

| Versión | Fecha | Notas |
|---|---|---|
| v1 | 2026-05-20 | Publicación inicial. |

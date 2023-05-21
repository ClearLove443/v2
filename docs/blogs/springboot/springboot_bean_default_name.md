---
title: "Spring中生成Bean时默认生成名称策略"
date: "2021-12-05 13:42:40"
tag: [springboot]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

在使用注解生成 Bean 的时候，如果没有指定 Bean 的名称，如@Componet("mytable")，则 Spring 会使用默认的名称生成策略，具体源码如下:

```java
public class AnnotationBeanNameGenerator implements BeanNameGenerator {

    private static final String COMPONENT_ANNOTATION_CLASSNAME = "org.springframework.stereotype.Component";


    public String generateBeanName(BeanDefinition definition, BeanDefinitionRegistry registry) {
        if (definition instanceof AnnotatedBeanDefinition) {
            String beanName = determineBeanNameFromAnnotation((AnnotatedBeanDefinition) definition);
            if (StringUtils.hasText(beanName)) {
                // Explicit bean name found.
                return beanName;
            }
        }
        // Fallback: generate a unique default bean name.
        return buildDefaultBeanName(definition);
    }

    /**
     * Derive a bean name from one of the annotations on the class.
     * @param annotatedDef the annotation-aware bean definition
     * @return the bean name, or <code>null</code> if none is found
     */
    protected String determineBeanNameFromAnnotation(AnnotatedBeanDefinition annotatedDef) {
        AnnotationMetadata amd = annotatedDef.getMetadata();
        Set<String> types = amd.getAnnotationTypes();
        String beanName = null;
        for (String type : types) {
            Map<String, Object> attributes = amd.getAnnotationAttributes(type);
            if (isStereotypeWithNameValue(type, amd.getMetaAnnotationTypes(type), attributes)) {
                String value = (String) attributes.get("value");
                if (StringUtils.hasLength(value)) {
                    if (beanName != null && !value.equals(beanName)) {
                        throw new IllegalStateException("Stereotype annotations suggest inconsistent " +
                                "component names: '" + beanName + "' versus '" + value + "'");
                    }
                    beanName = value;
                }
            }
        }
        return beanName;
    }

    /**
     * Check whether the given annotation is a stereotype that is allowed
     * to suggest a component name through its annotation <code>value()</code>.
     * @param annotationType the name of the annotation class to check
     * @param metaAnnotationTypes the names of meta-annotations on the given annotation
     * @param attributes the map of attributes for the given annotation
     * @return whether the annotation qualifies as a stereotype with component name
     */
    protected boolean isStereotypeWithNameValue(String annotationType,
            Set<String> metaAnnotationTypes, Map<String, Object> attributes) {

        boolean isStereotype = annotationType.equals(COMPONENT_ANNOTATION_CLASSNAME) ||
                (metaAnnotationTypes != null && metaAnnotationTypes.contains(COMPONENT_ANNOTATION_CLASSNAME)) ||
                annotationType.equals("javax.annotation.ManagedBean") ||
                annotationType.equals("javax.inject.Named");
        return (isStereotype && attributes != null && attributes.containsKey("value"));
    }

    /**
     * Derive a default bean name from the given bean definition.
     * <p>The default implementation simply builds a decapitalized version
     * of the short class name: e.g. "mypackage.MyJdbcDao" -> "myJdbcDao".
     * <p>Note that inner classes will thus have names of the form
     * "outerClassName.innerClassName", which because of the period in the
     * name may be an issue if you are autowiring by name.
     * @param definition the bean definition to build a bean name for
     * @return the default bean name (never <code>null</code>)
     */
    protected String buildDefaultBeanName(BeanDefinition definition) {
        String shortClassName = ClassUtils.getShortName(definition.getBeanClassName());
        return Introspector.decapitalize(shortClassName);
    }
```

Spring 在给 Bean 生成名字的时候，会调用 generateBeanName 方法，这个方法会先尝试获取注解括号中的名字，也就是用户自定义的名称，如果没有获取到，则调用 buildDefaultBeanName，用于生成默认的名称，这个方法会使用 Introspector.decapitalize(shortClassName);这个方法的 API 文档如下：

> Utility method to take a string and convert it to normal Java variable name capitalization. This normally means converting the first character from upper case to lower case, but in the (unusual) special case when there is more than one character and both the first and second characters are upper case, we leave it alone.
> Thus "FooBah" becomes "fooBah" and "X" becomes "x", but "URL" stays as "URL".
> Parameters:
> name - The string to be decapitalized.
> Returns:
> The decapitalized version of the string.

最重要的一句话翻译过来是说：如果 name 的开头两个及两个以上字符为大写，则不作处理并直接返回原来的名字，否则将名称的首字母小写后返回。

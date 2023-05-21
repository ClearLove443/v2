---
title: "Exceptions in Java 8 Lambda Expressions"
date: 2022-01-15 10:39:47
tag: [exception, java8, lambda]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

## 1. Overview

In Java 8, Lambda Expressions started to facilitate functional programming by providing a concise way to express behavior. However, the Functional Interfaces provided by the JDK don't deal with exceptions very well – and the code becomes verbose and cumbersome when it comes to handling them.

In this article, we'll explore some ways to deal with exceptions when writing lambda expressions.

## 2. Handling Unchecked Exceptions

First, let's understand the problem with an example.

We have a `List<Integer>` and we want to divide a constant, say 50 with every element of this list and print the results:

```java
List<Integer> integers = Arrays.asList(3, 9, 7, 6, 10, 20);
integers.forEach(i -> System.out.println(50 / i));
```

This expression works but there's one problem. If any of the elements in the list is 0, then we get an ArithmeticException: / by zero. Let's fix that by using a traditional try-catch block such that we log any such exception and continue execution for next elements:

```java
List<Integer> integers = Arrays.asList(3, 9, 7, 0, 10, 20);
integers.forEach(i -> {
    try {
        System.out.println(50 / i);
    } catch (ArithmeticException e) {
        System.err.println(
          "Arithmetic Exception occured : " + e.getMessage());
    }
});
```

The use of try-catch solves the problem, but the conciseness of a Lambda Expression is lost and it's no longer a small function as it's supposed to be.

To deal with this problem, we can write a lambda wrapper for the lambda function. Let's look at the code to see how it works:

```java
static Consumer<Integer> lambdaWrapper(Consumer<Integer> consumer) {
    return i -> {
        try {
            consumer.accept(i);
        } catch (ArithmeticException e) {
            System.err.println(
              "Arithmetic Exception occured : " + e.getMessage());
        }
    };
}
List<Integer> integers = Arrays.asList(3, 9, 7, 0, 10, 20);
integers.forEach(lambdaWrapper(i -> System.out.println(50 / i)));
```

At first, we wrote a wrapper method that will be responsible for handling the exception and then passed the lambda expression as a parameter to this method.

The wrapper method works as expected but, you may argue that it's basically removing the try-catch block from lambda expression and moving it to another method and it doesn't reduce the actual number of lines of code being written.

This is true in this case where the wrapper is specific to a particular use case but we can make use of generics to improve this method and use it for a variety of other scenarios:

```java
static <T, E extends Exception> Consumer<T>
  consumerWrapper(Consumer<T> consumer, Class<E> clazz) {

    return i -> {
        try {
            consumer.accept(i);
        } catch (Exception ex) {
            try {
                E exCast = clazz.cast(ex);
                System.err.println(
                  "Exception occured : " + exCast.getMessage());
            } catch (ClassCastException ccEx) {
                throw ex;
            }
        }
    };
}
List<Integer> integers = Arrays.asList(3, 9, 7, 0, 10, 20);
integers.forEach(
  consumerWrapper(
    i -> System.out.println(50 / i),
    ArithmeticException.class));
```

As we can see, this iteration of our wrapper method takes two arguments, the lambda expression and the type of Exception to be caught. This lambda wrapper is capable of handling all data types, not just Integers, and catch any specific type of exception and not the superclass Exception.

Also, notice that we have changed the name of the method from lambdaWrapper to consumerWrapper. It's because this method only handles lambda expressions for Functional Interface of type Consumer. We can write similar wrapper methods for other Functional Interfaces like Function, BiFunction, BiConsumer and so on.

## 3. Handling Checked Exceptions

Let's modify the example from the previous section and instead of printing to the console, let's write to a file.

```java
static void writeToFile(Integer integer) throws IOException {
    // logic to write to file which throws IOException
}
```

Note that the above method may throw the IOException.

```java
List<Integer> integers = Arrays.asList(3, 9, 7, 0, 10, 20);
integers.forEach(i -> writeToFile(i));
```

On compilation, we get the error:

java.lang.Error: Unresolved compilation problem: Unhandled exception type IOException
Because IOException is a checked exception, we must handle it explicitly. We have two options.

First, we may simply throw the exception outside of our method and take care of it somewhere else.

Alternatively, we can handle it inside the method that uses a lambda expression.

Let's explore both of the options.

### 3.1. Throwing Checked Exception from Lambda Expressions

Let's see what happens when we declare the IOException on the main method:

```java
public static void main(String[] args) throws IOException {
    List<Integer> integers = Arrays.asList(3, 9, 7, 0, 10, 20);
    integers.forEach(i -> writeToFile(i));
}
```

Still, we get the same error of unhandled IOException during the compilation.

java.lang.Error: Unresolved compilation problem: Unhandled exception type IOException
This is because lambda expressions are similar to Anonymous Inner Classes.

In our case, writeToFile method is the implementation of `Consumer<Integer>` functional interface.

Let's take a look at the Consumer‘s definition:

```java
@FunctionalInterface
public interface Consumer<T> {
    void accept(T t);
}
```

As we can see accept method doesn't declare any checked exception. This is why writeToFile isn't allowed to throw the IOException.

The most straightforward way would be to use a try-catch block, wrap the checked exception into an unchecked exception and rethrow it:

```java
List<Integer> integers = Arrays.asList(3, 9, 7, 0, 10, 20);
integers.forEach(i -> {
    try {
        writeToFile(i);
    } catch (IOException e) {
        throw new RuntimeException(e);
    }
});
```

This gets the code to compile and run. However, this approach introduces the same issue we already discussed in the previous section – it's verbose and cumbersome.

We can get better than that.

Let's create a custom functional interface with a single accept method that throws an exception.

```java
@FunctionalInterface
public interface ThrowingConsumer<T, E extends Exception> {
    void accept(T t) throws E;
}
```

And now, let's implement a wrapper method that's able to rethrow the exception:

```java
static <T> Consumer<T> throwingConsumerWrapper(
  ThrowingConsumer<T, Exception> throwingConsumer) {

    return i -> {
        try {
            throwingConsumer.accept(i);
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    };
}
```

Finally, we're able to simplify the way we use the writeToFile method:

```java
List<Integer> integers = Arrays.asList(3, 9, 7, 0, 10, 20);
integers.forEach(throwingConsumerWrapper(i -> writeToFile(i)));
```

This is still a kind of a workaround, but the end result looks pretty clean and is definitely easier to maintain.

Both, the ThrowingConsumer and the throwingConsumerWrapper are generic and can be easily reused in different places of our application.

### 3.2. Handling a Checked Exception in Lambda Expression

In this final section, we'll modify the wrapper to handle checked exceptions.

Since our ThrowingConsumer interface uses generics, we can easily handle any specific exception.

```java
static <T, E extends Exception> Consumer<T> handlingConsumerWrapper(
  ThrowingConsumer<T, E> throwingConsumer, Class<E> exceptionClass) {

    return i -> {
        try {
            throwingConsumer.accept(i);
        } catch (Exception ex) {
            try {
                E exCast = exceptionClass.cast(ex);
                System.err.println(
                  "Exception occured : " + exCast.getMessage());
            } catch (ClassCastException ccEx) {
                throw new RuntimeException(ex);
            }
        }
    };
}
```

Let's see how to use it in practice:

```java
List<Integer> integers = Arrays.asList(3, 9, 7, 0, 10, 20);
integers.forEach(handlingConsumerWrapper(
  i -> writeToFile(i), IOException.class));
```

Note, that the above code handles only IOException, whereas any other kind of exception is rethrown as a RuntimeException.

## 4. Conclusion

In this article, we showed how to handle a specific exception in lambda expression without losing the conciseness with the help of wrapper methods. We also learned how to write throwing alternatives for the Functional Interfaces present in JDK to either throw or handle a checked exception.

Another way would be to [explore the sneaky-throws hack](https://4comprehension.com/sneakily-throwing-exceptions-in-lambda-expressions-in-java/).

The complete source code of Functional Interface and wrapper methods can be downloaded from [here](https://github.com/eugenp/tutorials/tree/master/core-java-modules/core-java-lambdas/src/main/java/com/baeldung/java8/lambda/exceptions) and test classes from [here, over on Github](https://github.com/eugenp/tutorials/tree/master/core-java-modules/core-java-lambdas).

If you are looking for the out-of-the-box working solutions, [ThrowingFunction](https://github.com/pivovarit/throwing-function) project is worth checking out.

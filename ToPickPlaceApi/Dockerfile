FROM openjdk:12-jdk-alpine as build
WORKDIR /workspace/app

COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn
COPY pom.xml .
COPY infrastructure infrastructure
COPY topickplace-api topickplace-api
COPY topickplace-core topickplace-core

RUN ./mvnw install -DskipTests
RUN mkdir -p target && (mv ./topickplace-api/target/*.jar ./target)

FROM openjdk:12-jdk-alpine
WORKDIR /app
COPY --from=build ./workspace/app/target ./target
ENTRYPOINT ["java","-jar","./target/topickplace-api-0.0.1-SNAPSHOT.jar"]
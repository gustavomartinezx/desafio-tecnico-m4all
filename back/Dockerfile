# Dockerfile para o backend Spring Boot (Java)
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app

# Copia o Maven Wrapper e a pasta .mvn primeiro (para cache eficiente)
COPY mvnw ./mvnw
COPY mvnw.cmd ./mvnw.cmd
COPY .mvn ./.mvn
COPY pom.xml ./pom.xml
COPY src ./src

RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

# --- Production image ---
FROM eclipse-temurin:21-jre AS runner
WORKDIR /app

COPY --from=builder /app/target/*.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]

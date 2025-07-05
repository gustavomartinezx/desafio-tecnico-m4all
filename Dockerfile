FROM maven:3.9.6-eclipse-temurin-21 AS backend-build
WORKDIR /app/back
COPY back/mvnw ./mvnw
COPY back/mvnw.cmd ./mvnw.cmd
COPY back/.mvn ./.mvn
COPY back/pom.xml ./pom.xml
COPY back/src ./src
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

FROM node:20 AS frontend-build
WORKDIR /app/frontend
COPY frontend /app/frontend
RUN npm install && npm run build

FROM eclipse-temurin:21-jre AS production
WORKDIR /app

COPY --from=backend-build /app/back/target/*.jar /app/app.jar
COPY --from=frontend-build /app/frontend/.next /app/frontend/.next
COPY --from=frontend-build /app/frontend/public /app/frontend/public
COPY --from=frontend-build /app/frontend/package.json /app/frontend/package.json
COPY --from=frontend-build /app/frontend/node_modules /app/frontend/node_modules

EXPOSE 8080 3000

COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT ["/app/docker-entrypoint.sh"]

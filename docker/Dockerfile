FROM maven:3.8-jdk-8

ENV GITHUB_ORG="intesys"
ENV OH_CORE_BRANCH="develop"
ENV OH_API_BRANCH="develop"

WORKDIR /
RUN git clone --depth=1 -b ${OH_CORE_BRANCH} https://github.com/${GITHUB_ORG}/openhospital-core.git
WORKDIR /openhospital-core
RUN mvn install

WORKDIR /
RUN git clone --depth=1 -b ${OH_API_BRANCH} https://github.com/${GITHUB_ORG}/openhospital-api.git
WORKDIR /openhospital-api
RUN mvn install

CMD mvn spring-boot:run

# RUN java -jar openhospital-api-0.0.2.jar
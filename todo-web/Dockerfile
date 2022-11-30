FROM node:10.12

RUN apt-get update
RUN apt-get install curl  --assume-yes

WORKDIR /app

COPY ./ /app/

ENTRYPOINT ["bash", "entrypoint.sh"]

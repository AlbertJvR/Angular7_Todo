FROM node:10.12

RUN apt-get update
RUN apt-get install curl  --assume-yes

RUN npm i -g yarn

WORKDIR /app
COPY ./ /app/

RUN yarn


ENTRYPOINT ["bash", "entrypoint.sh"]

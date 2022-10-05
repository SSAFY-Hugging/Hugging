FROM python:3.10
ENV PYTHONUNBUFFERED = 1

RUN apt-get -y update
RUN apt-get install -y default-libmysqlclient-dev

RUN mkdir /app
WORKDIR /app
COPY requirements.txt /app/

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /app/


EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi:application"]
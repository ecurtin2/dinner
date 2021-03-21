FROM python:3.9
ADD requirements.txt /site/requirements.txt
RUN python -m pip install -r /site/requirements.txt
ADD . /site
EXPOSE 8000
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
CMD ["bash", "-c", "python /site/manage.py migrate && python /site/manage.py runserver 0.0.0.0:8000"]

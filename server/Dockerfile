FROM python:3.9
ADD requirements.txt .
RUN pip install -r requirements.txt
EXPOSE 9090
ADD src /src
WORKDIR /src
CMD ["python", "main.py"]

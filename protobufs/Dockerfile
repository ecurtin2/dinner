FROM continuumio/miniconda3
RUN conda install -c conda-forge gcc_linux-64
RUN conda install protobuf nodejs pip
RUN python -m pip install betterproto[compiler]
RUN npm install --global protoc-gen-elm
RUN mkdir -p /build/python && mkdir -p /build/elm
ADD recipe.proto .
ADD update.sh .
ENTRYPOINT ["bash"]
CMD ["update.sh"]
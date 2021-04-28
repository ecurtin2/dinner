FROM continuumio/miniconda3
RUN conda install -c conda-forge gcc_linux-64
RUN conda install protobuf nodejs pip
RUN python -m pip install betterproto[compiler]==2.0.0b3
RUN npm install --global ts-proto
ADD recipe.proto .
ADD update.sh .
ENTRYPOINT ["bash"]
CMD ["update.sh"]
FROM rust:1.57
RUN rustup component add rustfmt
ADD protobufs protobufs
WORKDIR server
COPY server .
RUN cargo build --bin server
CMD ["cargo", "run", "--bin", "server"]
FROM rust:1.57
RUN rustup component add rustfmt
ADD protobufs protobufs
WORKDIR rust-server
COPY rust-server .
RUN cargo build --bin server
CMD ["cargo", "run", "--bin", "server"]
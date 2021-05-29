mkdir -p /build/python
protoc --python_betterproto_out=/build/python recipe.proto

mkdir -p /build/typescript
protoc --ts_proto_out=/build/typescript --ts_proto_opt=esModuleInterop=true --ts_proto_opt=outputClientImpl=grpc-web recipe.proto
echo built typescript protofiles
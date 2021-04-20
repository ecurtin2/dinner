mkdir -p /build/elm \
  && mkdir -p /build/python \
  && protoc \
  --elm_out=/build/elm \
  --python_betterproto_out=/build/python \
  recipe.proto

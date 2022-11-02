# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="./src/generated"
mkdir -p ${OUT_DIR}
protoc -I./protobuf/swagger \
-I/Users/aqaurius6666/go/pkg/mod/github.com/googleapis/googleapis@v0.0.0-20221101200616-77bdd3dd26ea \
-I/Users/aqaurius6666/go/pkg/mod/github.com/grpc-ecosystem/grpc-gateway/v2@v2.12.0 \
--grpc-gateway-ts_out=ts_import_roots=$(pwd),ts_import_root_aliases=.:${OUT_DIR} \
api.proto


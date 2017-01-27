FROM alpine:3.5
RUN echo "Step 2"
RUN echo "Step 3" && exit 1
RUN echo "Step 4"


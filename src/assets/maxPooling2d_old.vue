<template>
  <v-card class="mx-auto" max-width="800" outlined>
    <v-tooltip bottom max-width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-card-title>
          <span v-bind="attrs" v-on="on">maxPooling2d</span>
        </v-card-title>
      </template>
      <span
      >Max pooling operation for spatial data.<br /><br />

        Input shape <br />If dataFormat === CHANNEL_LAST: 4D tensor with shape:
        [batchSize, rows, cols, channels] <br />If dataFormat === CHANNEL_FIRST:
        4D tensor with shape: [batchSize, channels, rows, cols]
        <br /><br />Output shape <br />If dataFormat=CHANNEL_LAST: 4D tensor
        with shape: [batchSize, pooleRows, pooledCols, channels] <br />If
        dataFormat=CHANNEL_FIRST: 4D tensor with shape: [batchSize, channels,
        pooleRows, pooledCols]</span
      >
    </v-tooltip>
    <v-card-actions>
      <v-row no-gutters>
        <!-- poolSize -->
        <v-col cols="3">
          <v-text-field label="poolSize" dense outlined></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
            >poolSize (number|[number, number]) <br /><br />Factors by which
              to downscale in each dimension [vertical, horizontal]. Expects an
              integer or an array of 2 integers. <br /><br />For example, [2, 2]
              will halve the input in both spatial dimension. If only one
              integer is specified, the same window length will be used for both
              dimensions.</span
            >
          </v-tooltip>
        </v-col>
        <!-- strides -->
        <v-col cols="3">
          <v-text-field label="strides" dense outlined></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
            >strides (number|[number, number]) <br /><br />The size of the
              stride in each dimension of the pooling window. Expects an integer
              or an array of 2 integers. Integer, tuple of 2 integers, or None.
              If null, defaults to poolSize.</span
            >
          </v-tooltip>
        </v-col>
        <!-- padding  -->
        <v-col cols="3">
          <v-select
              v-model="padding"
              :items="padding_list"
              label="padding"
              dense
              outlined
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
            >padding ('valid'|'same'|'causal') <br /><br />Padding mode.</span
            >
          </v-tooltip>
        </v-col>
        <!-- dataFormat  -->
        <v-col cols="3">
          <v-select
              v-model="dataFormat"
              :items="dataFormat_list"
              label="dataFormat"
              dense
              outlined
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
            >dataFormat ('channelsFirst'|'channelsLast') <br /><br />Format of
              the data, which determines the ordering of the dimensions in the
              inputs. <br /><br />channels_last corresponds to inputs with shape
              (batch, ..., channels) <br /><br />channels_first corresponds to
              inputs with shape (batch, channels, ...). <br /><br />Defaults to
              channels_last.</span
            >
          </v-tooltip>
        </v-col>
        <!-- inputShape  -->
        <v-col cols="3">
          <v-text-field
              v-model="inputShape"
              label="inputShape"
              dense
              outlined
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
            >inputShape ((null | number)[]) <br /><br />If defined, will be
              used to create an input layer to insert before this layer. If both
              inputShape and batchInputShape are defined, batchInputShape will
              be used. This argument is only applicable to input layers (the
              first layer of a model).</span
            >
          </v-tooltip>
        </v-col>
        <!-- batchInputShape  -->
        <v-col cols="3">
          <v-text-field
              v-model="batchInputShape"
              label="batchInputShape"
              dense
              outlined
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
            >batchInputShape ((null | number)[]) <br /><br />If defined, will
              be used to create an input layer to insert before this layer. If
              both inputShape and batchInputShape are defined, batchInputShape
              will be used. This argument is only applicable to input layers
              (the first layer of a model).</span
            >
          </v-tooltip>
        </v-col>
        <!-- batchSize  -->
        <v-col cols="3">
          <v-text-field
              v-model="batchSize"
              label="batchSize"
              dense
              outlined
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
            >batchSize (number) <br /><br />
              If inputShape is specified and batchInputShape is not specified,
              batchSize is used to construct the batchInputShape: [batchSize,
              ...inputShape]</span
            >
          </v-tooltip>
        </v-col>
        <!-- dtype  -->
        <v-col cols="3">
          <v-select
              v-model="dtype"
              :items="dtype_list"
              label="dtype"
              dense
              outlined
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
            >dtype ('float32'|'int32'|'bool'|'complex64'|'string')
              <br /><br />The data-type for this layer. Defaults to 'float32'.
              This argument is only applicable to input layers (the first layer
              of a model).</span
            >
          </v-tooltip>
        </v-col>
        <!-- name  -->
        <v-col cols="3">
          <v-text-field
              v-model="name"
              label="name"
              dense
              outlined
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span>name (string) <br /><br />Name for this layer.</span>
          </v-tooltip>
        </v-col>
        <!-- trainable  -->
        <v-col cols="3">
          <v-select
              v-model="trainable"
              :items="trainable_list"
              label="trainable"
              dense
              outlined
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
            >trainable (boolean) <br /><br />Whether the weights of this layer
              are updatable by fit. Defaults to true.</span
            >
          </v-tooltip>
        </v-col>
        <!-- weights  -->
        <v-col cols="3">
          <v-text-field
              v-model="weights"
              label="weights"
              dense
              outlined
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
            >weights (tf.Tensor[]) <br /><br />Initial weight values of the
              layer.</span
            >
          </v-tooltip>
        </v-col>
        <!-- inputDType  -->
        <v-col cols="3">
          <v-select
              v-model="inputDType"
              :items="inputDType_list"
              label="inputDType"
              dense
              outlined
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon>
            </template>
            <span
            >inputDType ('float32'|'int32'|'bool'|'complex64'|'string')
              <br /><br />Legacy support. Do not use for new code.</span
            >
          </v-tooltip>
        </v-col>
        <!--        remove-->

        <v-col cols="4">
          <v-btn
              color="error"
              @click="remove"
              v-if="this.index + 1 == this.totalLayers"
          >
            remove
          </v-btn>
          <v-btn
              color="error"
              @click="remove"
              disabled
              v-if="this.index + 1 != this.totalLayers"
          >
            remove
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    index: {
      type: Number,
    },
    totalLayers: {
      type: Number,
    },
  },
  data: () => ({
    allData: {},
    poolSize: "",
    strides: "",
    padding: "",
    dataFormat: "",
    inputShape: "",
    batchInputShape: "",
    batchSize: "",
    dtype: "",
    name: "",
    trainable: "",
    weights: "",
    inputDType: "",
    padding_list: ["valid", "same", "causal"],
    dataFormat_list: ["channelsFirst", "channelsLast"],
    dtype_list: ["float32", "int32", "bool", "complex64", "string"],
    trainable_list: ["true", "false"],
    inputDType_list: ["float32", "int32", "bool", "complex64", "string"],
  }),
  methods: {
    remove() {
      this.$emit("remove", "");
    },
    sendData() {
      //send data to allData
      this.allData["poolSize"] = this.poolSize;
      this.allData["strides"] = this.strides;
      this.allData["padding"] = this.padding;
      this.allData["dataFormat"] = this.dataFormat;
      this.allData["inputShape"] = this.inputShape;
      this.allData["batchInputShape"] = this.batchInputShape;
      this.allData["batchSize"] = this.batchSize;
      this.allData["dtype"] = this.dtype;
      this.allData["name"] = this.name;
      this.allData["trainable"] = this.trainable;
      this.allData["weights"] = this.weights;
      this.allData["inputDType"] = this.inputDType;
    },
  },
  mounted() {},
};
</script>

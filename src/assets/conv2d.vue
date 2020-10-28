<template>
  <v-card class="mx-auto" max-width="800" outlined>
    <v-tooltip bottom max-width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-card-title>
          <span v-bind="attrs" v-on="on">conv2d</span>
        </v-card-title>
      </template>
      <span
      >2D convolution layer (e.g. spatial convolution over images).
        <br/><br/>This layer creates a convolution kernel that is convolved
        with the layer input to produce a tensor of outputs. <br/><br/>If
        useBias is True, a bias vector is created and added to the outputs.
        <br/><br/>If activation is not null, it is applied to the outputs as
        well. <br/><br/>When using this layer as the first layer in a model,
        provide the keyword argument inputShape (Array of integers, does not
        include the sample axis), e.g. inputShape=[128, 128, 3] for 128x128 RGB
        pictures in dataFormat='channelsLast'.</span
      >
    </v-tooltip>
    <v-card-actions>
      <v-row no-gutters>
        <!-- filters -->
        <v-col cols="3">
          <v-text-field v-model="filters" label="filters" dense outlined></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon
              >
            </template>
            <span
            >filters (number) <br/><br/>The dimensionality of the output
              space (i.e. the number of filters in the convolution).</span
            >
          </v-tooltip>
        </v-col>
        <!-- kernelSize -->
        <v-col cols="3">
          <v-text-field v-model="kernelSize" label="kernelSize" dense outlined></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon
              >
            </template>
            <span
            >kernelSize (number|number[]) <br/><br/>The dimensions of the
              convolution window. If kernelSize is a number, the convolutional
              window will be square.</span
            >
          </v-tooltip>
        </v-col>
        <!-- strides -->
        <v-col cols="3">
          <v-text-field v-model="strides" label="strides" dense outlined></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon
              >
            </template>
            <span
            >strides (number|number[]) <br/><br/>The strides of the
              convolution in each dimension. If strides is a number, strides in
              both dimensions are equal. <br/><br/>Specifying any stride value
              != 1 is incompatible with specifying any dilationRate value !=
              1.</span
            >
          </v-tooltip>
        </v-col>
        <!-- padding -->
        <v-col cols="3">
          <v-select v-model="padding" :items="padding_list" label="padding" dense outlined></v-select>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon
              >
            </template>
            <span
            >padding ('valid'|'same'|'causal') <br/><br/>Padding mode.</span
            >
          </v-tooltip>
        </v-col>
        <!-- dataFormat -->
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
              </v-icon
              >
            </template>
            <span
            >dataFormat ('channelsFirst'|'channelsLast') <br/><br/>Format of
              the data, which determines the ordering of the dimensions in the
              inputs. <br/><br/>channels_last corresponds to inputs with shape
              (batch, ..., channels) <br/><br/>channels_first corresponds to
              inputs with shape (batch, channels, ...). <br/><br/>Defaults to
              channels_last.</span
            >
          </v-tooltip>
        </v-col>
        <!-- dilationRate  -->
        <v-col cols="3">
          <v-text-field v-model="dilationRate" label="dilationRate " dense outlined></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon
              >
            </template>
            <span
            >dilationRate (number|[number]|[number, number]|[number, number,
              number]) <br/><br/>The dilation rate to use for the dilated
              convolution in each dimension. Should be an integer or array of
              two or three integers. <br/><br/>Currently, specifying any
              dilationRate value != 1 is incompatible with specifying any
              strides value != 1.</span
            >
          </v-tooltip>
        </v-col>
        <!-- activation  -->
        <v-col cols="3">
          <v-select
              v-model="activation"
              :items="activation_list"
              label="activation "
              dense
              outlined
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" v-bind="attrs" v-on="on"
              >mdi-chat-alert-outline
              </v-icon
              >
            </template>
            <span
            >activation ('elu'|'hardSigmoid'|'linear'|'relu'|'relu6'|
              'selu'|'sigmoid'|'softmax'|'softplus'|'softsign'|'tanh')
              <br/><br/>Activation function of the layer. <br/><br/>If you
              don't specify the activation, none is applied.</span
            >
          </v-tooltip>
        </v-col>
        <!-- useBias  -->
        <!-- kernelInitializer  -->
        <!-- biasInitializer  -->
        <!-- kernelConstraint  -->
        <!-- biasConstraint  -->
        <!-- kernelRegularizer  -->
        <!-- biasRegularizer  -->
        <!-- activityRegularizer  -->
        <!-- inputShape  -->
        <!-- batchInputShape  -->
        <!-- batchSize  -->
        <!-- dtype  -->
        <!-- name  -->
        <!-- trainable  -->
        <!-- weights  -->
        <!-- inputDType  -->

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
    allData:{},
    filters: "",
    kernelSize:"",
    strides:"",
    padding: "",
    dataFormat:"",
    dilationRate:"",
    activation:"",
    padding_list: ["valid", "same", "causal"],
    dataFormat_list: ["channelsFirst", "channelsLast"],
    activation_list: [
      "elu",
      "hardSigmoid",
      "linear",
      "relu",
      "relu6",
      "selu",
      "sigmoid",
      "softmax",
      "softplus",
      "softsign",
      "tanh",
    ],
  }),
  methods: {
    remove() {
      this.$emit("remove", "")
    },
    sendData(){
      //send data to allData
      this.allData['filters'] = this.filters
      this.allData['kernelSize'] = this.kernelSize
      this.allData['strides'] = this.strides
      this.allData['padding'] = this.padding
      this.allData['dataFormat'] = this.dataFormat
      this.allData['dilationRate'] = this.dilationRate
      this.allData['activation'] = this.activation
    }
  },
  mounted() {
  },
};
</script>

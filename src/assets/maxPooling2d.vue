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
                >mdi-chat-alert-outline</v-icon
              >
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
                >mdi-chat-alert-outline</v-icon
              >
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
        <!-- dataFormat  -->
        <!-- inputShape  -->
        <!-- batchInputShape  -->
        <!-- batchSize  -->
        <!-- dtype  -->
        <!-- name  -->
        <!-- trainable  -->
        <!-- inputDType  -->
        <!-- weights  -->

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
  data: () => ({}),
  methods: {
    remove() {
      this.$emit("remove", "");
    },
  },
  mounted() {},
};
</script>

<template>
  <v-app id="app">
    <v-main>
      <v-card
          v-if="rates"
          max-width="600"
          class="mx-auto"
      >
        <v-list
            subheader
            two-line
        >
          <div v-for="(currencies, main, id) in rates" :key="id">
            <v-subheader inset>{{ main }}</v-subheader>
            <v-list-item
                v-for="(currency, name, idx) in currencies" :key="idx"
            >
              <v-list-item-avatar>
                <v-icon
                    class="grey lighten-1"
                    dark
                >
                  mdi-currency-usd
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="name"></v-list-item-title>

                <v-list-item-subtitle v-text="currency"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </div>
        </v-list>

        <v-card-actions>
          <v-btn
              color="deep-purple lighten-2"
              text
              @click="stop"
          >
            Stop
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar
          v-model="snackbar"
      >
        Got results
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Component, Inject, Vue} from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import {CryptoServiceToken} from "@/core/api/crypto.api";
import {interval, Observable, Subscription} from "rxjs";
import {switchMap} from "rxjs/operators";

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  @Inject(CryptoServiceToken) readonly cryptoService: Observable<any>;

  rates = null;
  snackbar = false;
  sub: Subscription;

  stop() {
    this.sub.unsubscribe()
  }

  mounted() {
    this.sub = interval(5000).pipe(
        switchMap(() => this.cryptoService)
    ).subscribe(d => {
      this.rates = {...d};
      this.snackbar = true;
    })
  }

  destroyed() {
    this.stop()
  }
}
</script>

<style lang="scss">
</style>

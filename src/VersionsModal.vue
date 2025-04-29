<script setup lang="ts">

</script>

<template>
 <h2>
   Versjonshistorikk
 </h2>
 <ol>
  <li>
    <h3>Versjon 2 - 23.04.2025</h3>
    <ul>
      <li>Bøyde ord er nå også mulige løsningsord.</li>
      <li>Fjernet de mest obskure ordene fra mulige løsningsord.</li>
    </ul>
    <p class="nb">N.B. Dette har dessverre ført til at de som aldri laster eller refresher Ordle fortsatt er på gamle løsningsord. Dersom noen opplever ulike ord, vennligst refresh Ordle siden.</p>
  </li>
  <li>
    <h3>Versjon 1 - 16.01.2022</h3>
    <p>Første utgave av Ordle!</p>
  </li>
 </ol>
</template>

<style scoped>
 h2 {
  font-size: 1.2rem;
  margin: 0;
 }

 .nb {
  font-style: italic;
  font-size: 0.75rem;
  margin-top: 5px;
 }

 ol {
  list-style: disc;
  padding-left: 15px;
 }

 h3 {
  font-size: 1.1rem;
  margin: 10px 0;
 }

 p {
  margin: 0;
 }
</style>
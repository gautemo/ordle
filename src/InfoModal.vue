<template>
  <section>
    <p>Ordle er et spill hvor du skal gjette dagens ord innen seks forsøk.</p>
    <div class="letter-box">
      <div class="letter correct">A</div>
      <span>
        Grønn betyr
        <u>riktig</u> bokstav på <u>riktig</u> plass.
      </span>
    </div>
    <div class="letter-box">
      <div class="letter misplaced">B</div>
      <span>
        Gul betyr
        <u>riktig</u> bokstav på <u>feil</u> plass.
      </span>
    </div>
    <div class="letter-box">
      <div class="letter absent">C</div>
      <span>
        Rød betyr at bokstav
        <u>ikke</u> er i bruk.
      </span>
    </div>
    <p>Kom tilbake neste dag for et nytt ord!</p>
  </section>
  <section class="attribute">
    Dette spillet er inspirert av
    <a href="https://www.powerlanguage.co.uk/wordle/" target="_blank" rel="noopener noreferrer">Wordle</a>, men er på norsk.
  </section>
</template>

<style scoped>
.attribute {
  font-weight: bold;
}

.letter-box {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.letter {
  width: clamp(30px, min(15vw, 8vh), 80px);
  aspect-ratio: 1 / 1;
  margin: 3px;
  font-size: var(--size-xl);
  display: grid;
  place-items: center;
  border-radius: 8px;
  border: 2px solid var(--grey);
}

.letter.absent {
  background-color: var(--absent);
  color: var(--black);
}

.letter.misplaced {
  background-color: var(--misplaced);
  color: var(--black);
}

.letter.correct {
  background-color: var(--correct);
  color: var(--black);
}
</style>

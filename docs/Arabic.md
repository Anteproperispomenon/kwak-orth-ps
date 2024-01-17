# Arabic Orthography for Kwak'wala

This is another experimental orthography for Kwak'wala,
based on various alphabets that use the Arabic Script.
Unlike other experimental orthographies so far, this
orthography is written from Right-to-Left (RTL), as are
all alphabets that use the Arabic Script.

## Conventions

While this orthography is based on Arabic, there are 
several ways in which it differs significantly from
most alphabets that use the Arabic Script.

  - All vowels are represented as full letters. This is
    because Kwak'wala has more vowels than Standard Arabic,
    most Kwak'wala orthographies don't encode vowel length,
    and the Hamzah works better with full letters (more on
    this later).
  - In the default version, all vowels other than /i/ and /u/
    are represented as the letter Alif followed together with
    vowel diacritics. Plain Alif represents /ə/ since it is
    the "standard vowel" in Kwak'wala, while Alif with the
    vowel mark for /a/ represents /a/. /e/ and /o/ are
    represented as the diphthongs /ai/ and /au/ respectively,
    since that's how they're realised in quite a few dialects
    of Arabic.
  - Glottalisation and Ejective Consonants are marked with a
    Hamzah as a diacritic. Hamzah represents the glottal stop
    in Arabic and is typically combined with another letter,
    but does have a full letter form. However, the full letter
    form only has an isolated form, so it does not combine as
    nicely as most other letters.
  - In the default version, the Hamzah is typically combined
    with the following vowel as a diacritic. It is not combined
    with consonants, since that would create ambiguity over 
    whether the consonant is glottalised/ejective.
  - Labialisation is marked with the vowel diacritic for /u/.
  - Since Arabic uses the same character for the phonemes /i/ 
    and /j/, as well as the same character for the phonemes
    /u/ and /w/, this orthography uses the same base letters
    for each pair. However, the consonantal version has the
    null-vowel mark added to it to indicate that it is a
    consonant.
  - Like other experimental orthographies, letters that
    typically represent affricates with /ʃ/ or /ʒ/ as 
    the release instead represent affricates with /ɬ/
    or /l/ respectively in Kwak'wala.

Like most (all?) alphabets that use the Arabic Script, this
orthography combines letters in the same word together cursively. 
This results in most letters having multiple distinct but related
forms (this process is automated when using Unicode; letters written
will automatically have the correct form). The four forms are 
Isolated, Initial, Medial, and Final. Since the Arabic Script has no 
capitalisation, these are the only four forms. Also, some letters 
do not connect to the following letter. For these letters, the Medial 
form is the same as the Final form, and the Initial form is the same 
as the Isolated form. If one such letter is the penultimate letter 
in a word, then the final letter will be in its Isolated form.

## Chart

### Single Letters

|Grubb| Isolated       | Initial | Medial | Final |
|-----|----------------|---------|--------|-------|
| M   | &#x645;        | &#x645;&#x640; | &#x640;&#x645;&#x640; | &#x640;&#x645; |
| 'M  | &#x645;&#x654; | &#x645;&#x654;&#x640; | &#x640;&#x645;&#x654;&#x640; | &#x640;&#x645;&#x654; |
| N   | &#x646;        | &#x646;&#x640; | &#x640;&#x646;&#x640; | &#x640;&#x646; |
| 'N  | &#x646;&#x654; | &#x646;&#x654;&#x640; | &#x640;&#x646;&#x654;&#x640; | &#x640;&#x646;&#x654; |
| P   | &#x67e;        | &#x67e;&#x640; | &#x640;&#x67e;&#x640; | &#x640;&#x67e; |
| P'  | &#x67e;&#x654; | &#x67e;&#x654;&#x640; | &#x640;&#x67e;&#x654;&#x640; | &#x640;&#x67e;&#x654; |
| B   | &#x628;        | &#x628;&#x640; | &#x640;&#x628;&#x640; | &#x640;&#x628; |
| T   | &#x62a;        | &#x62a;&#x640; | &#x640;&#x62a;&#x640; | &#x640;&#x62a; |
| T'  | &#x62a;&#x654; | &#x62a;&#x654;&#x640; | &#x640;&#x62a;&#x654;&#x640; | &#x640;&#x62a;&#x654; |
| D   | &#x62f;        | &#x62f;        | &#x640;&#x62f; | &#x640;&#x62f; |
| TS  | &#x684;        | &#x684;&#x640; | &#x640;&#x684;&#x640; | &#x640;&#x684; |
| TS' | &#x684;&#x654; | &#x684;&#x654;&#x640; | &#x640;&#x684;&#x654;&#x640; | &#x640;&#x684;&#x654; |
| DZ  | &#x62c;        | &#x62c;&#x640; | &#x640;&#x62c;&#x640; | &#x640;&#x62c; |
| TL  | &#x686;        | &#x686;&#x640; | &#x640;&#x686;&#x640; | &#x640;&#x686; |
| TL' | &#x686;&#x654; | &#x686;&#x654;&#x640; | &#x640;&#x686;&#x654;&#x640; | &#x640;&#x686;&#x654; |
| DL  | &#x685;        | &#x685;&#x640; | &#x640;&#x685;&#x640; | &#x640;&#x685; |
|**Grubb**| **Isolated**       | **Initial** | **Medial** | **Final** |
| S   | &#x633;        | &#x633;&#x640; | &#x640;&#x633;&#x640; | &#x640;&#x633; |
| LH  | &#x634;        | &#x634;&#x640; | &#x640;&#x634;&#x640; | &#x640;&#x634; |
| LH* | &#x6b5;        | &#x6b5;&#x640; | &#x640;&#x6b5;&#x640; | &#x640;&#x6b5; |
| L   | &#x644;        | &#x644;&#x640; | &#x640;&#x644;&#x640; | &#x640;&#x644; |
| 'L  | &#x644;&#x654; | &#x644;&#x654;&#x640; | &#x640;&#x644;&#x654;&#x640; | &#x640;&#x644;&#x654; |
| Y   | &#x64a;&#x652; | &#x64a;&#x652;&#x640; | &#x640;&#x64a;&#x652;&#x640; | &#x640;&#x64a;&#x652; |
| 'Y**| &#x626;&#x652; | &#x626;&#x652;&#x640; | &#x640;&#x626;&#x652;&#x640; | &#x640;&#x626;&#x652; |
| W   | &#x648;&#x652; | &#x648;&#x652;        | &#x640;&#x648;&#x652;        | &#x640;&#x648;&#x652; |
| 'W  | &#x624;&#x652; | &#x624;&#x652;        | &#x640;&#x624;&#x652;        | &#x640;&#x624;&#x652; |
| K   | &#x643;        | &#x643;&#x640; | &#x640;&#x643;&#x640; | &#x640;&#x643; |
| K'  | &#x643;&#x654; | &#x643;&#x654;&#x640; | &#x640;&#x643;&#x654;&#x640; | &#x640;&#x643;&#x654; |
| G   | &#x6ac;        | &#x6ac;&#x640; | &#x640;&#x6ac;&#x640; | &#x640;&#x6ac; |
| G*  | &#x6a7;        | &#x6a7;&#x640; | &#x640;&#x6a7;&#x640; | &#x640;&#x6a7; |
| KW  | &#x643;&#x64f; | &#x643;&#x64f;&#x640; | &#x640;&#x643;&#x64f;&#x640; | &#x640;&#x643;&#x64f; |
| KW' | &#x643;&#x64f;&#x654; | &#x643;&#x64f;&#x654;&#x640; | &#x640;&#x643;&#x64f;&#x654;&#x640; | &#x640;&#x643;&#x64f;&#x654; |
| GW  | &#x6ac;&#x64f; | &#x6ac;&#x64f;&#x640; | &#x640;&#x6ac;&#x64f;&#x640; | &#x640;&#x6ac;&#x64f; |
| GW* | &#x6a7;&#x64f; | &#x6a7;&#x64f;&#x640; | &#x640;&#x6a7;&#x64f;&#x640; | &#x640;&#x6a7;&#x64f; |
| KH  | &#x642;        | &#x642;&#x640; | &#x640;&#x642;&#x640; | &#x640;&#x642; |
| KH' | &#x642;&#x655; | &#x642;&#x655;&#x640; | &#x640;&#x642;&#x655;&#x640; | &#x640;&#x642;&#x655; |
| GH  | &#x6a8;        | &#x6a8;&#x640; | &#x640;&#x6a8;&#x640; | &#x640;&#x6a8; |
| GH* | &#x63a;        | &#x63a;&#x640; | &#x640;&#x63a;&#x640; | &#x640;&#x63a; |
| KHW | &#x642;&#x64f; | &#x642;&#x64f;&#x640; | &#x640;&#x642;&#x640; | &#x640;&#x642; |
| KHW'| &#x642;&#x655;&#x64f; | &#x642;&#x64f;&#x655;&#x640; | &#x640;&#x642;&#x64f;&#x655;&#x640; | &#x640;&#x642;&#x64f;&#x655; |
| GHW | &#x6a8;&#x64f; | &#x6a8;&#x64f;&#x640; | &#x640;&#x6a8;&#x64f;&#x640; | &#x640;&#x6a8;&#x64f; |
| GHW*| &#x63a;&#x64f; | &#x63a;&#x64f;&#x640; | &#x640;&#x63a;&#x64f;&#x640; | &#x640;&#x63a;&#x64f; |
| X   | &#x62e;        | &#x62e;&#x640; | &#x640;&#x62e;&#x640; | &#x640;&#x62e; |
| XW  | &#x62e;&#x64f; | &#x62e;&#x64f;&#x640; | &#x640;&#x62e;&#x64f;&#x640; | &#x640;&#x62e;&#x64f; |
| XH  | &#x62d;        | &#x62d;&#x640; | &#x640;&#x62d;&#x640; | &#x640;&#x62d; |
| XHW | &#x62d;&#x64f; | &#x62d;&#x64f;&#x640; | &#x640;&#x62d;&#x64f;&#x640; | &#x640;&#x62d;&#x64f; |
| H/J | &#x647;        | &#x647;&#x640; | &#x640;&#x647;&#x640; | &#x640;&#x647; |
| &#x294; | &#x621;    | &#x621;        | &#x621;               | &#x621;        |
|**Grubb**| **Isolated**       | **Initial** | **Medial** | **Final** |
| E   | &#x627;        | &#x627;        | &#x640;&#x627; | &#x640;&#x627; |
| A   | &#x627;&#x64e; | &#x627;&#x64e; | &#x640;&#x627;&#x64e; | &#x640;&#x627;&#x64e; |
| EH  | &#x627;&#x650; | &#x627;&#x650; | &#x640;&#x627;&#x650; | &#x640;&#x627;&#x650; |
| I   | &#x64a;        | &#x64a;&#x640; | &#x640;&#x64a;&#x640; | &#x640;&#x64a; |
| O   | &#x627;&#x64f; | &#x627;&#x64f; | &#x640;&#x627;&#x64f; | &#x640;&#x627;&#x64f; |
| U   | &#x648;        | &#x648;        | &#x640;&#x648; | &#x640;&#x648; |

\* Alternate form of the listed letter.

### Combined Letters

|Grubb| Isolated       | Initial | Medial | Final |
|-----|----------------|---------|--------|-------|
| Le  | &#x644;&#x627; | &#x644;&#x627; | &#x640;&#x644;&#x627; | &#x640;&#x644;&#x627; |
| La  | &#x644;&#x627;&#x64e; | &#x644;&#x627;&#x64e; | &#x640;&#x644;&#x627;&#x64e; | &#x640;&#x644;&#x627;&#x64e; |
| Leh | &#x644;&#x627;&#x650; | &#x644;&#x627;&#x650; | &#x640;&#x644;&#x627;&#x650; | &#x640;&#x644;&#x627;&#x650; |
| Lo  | &#x644;&#x627;&#x64f; | &#x644;&#x627;&#x64f; | &#x640;&#x644;&#x627;&#x64f; | &#x640;&#x644;&#x627;&#x64f; |
| 'Le | &#x644;&#x654;&#x627; | &#x644;&#x654;&#x627; | &#x640;&#x644;&#x654;&#x627; | &#x640;&#x644;&#x654;&#x627; |
| 'La | &#x644;&#x654;&#x627;&#x64e; | &#x644;&#x654;&#x627;&#x64e; | &#x640;&#x644;&#x654;&#x627;&#x64e; | &#x640;&#x644;&#x654;&#x627;&#x64e; |
| 'Leh| &#x644;&#x654;&#x627;&#x650; | &#x644;&#x654;&#x627;&#x650; | &#x640;&#x644;&#x654;&#x627;&#x650; | &#x640;&#x644;&#x654;&#x627;&#x650; |
| 'Lo | &#x644;&#x654;&#x627;&#x64f; | &#x644;&#x654;&#x627;&#x64f; | &#x640;&#x644;&#x654;&#x627;&#x64f; | &#x640;&#x644;&#x654;&#x627;&#x64f; |
| 'E   | &#x625;        | &#x625;        | &#x640;&#x625; | &#x640;&#x625; |
| 'A   | &#x625;&#x64e; | &#x625;&#x64e; | &#x640;&#x625;&#x64e; | &#x640;&#x625;&#x64e; |
| 'EH  | &#x623;&#x650; | &#x623;&#x650; | &#x640;&#x623;&#x650; | &#x640;&#x623;&#x650; |
| 'I** | &#x626;        | &#x626;&#x640; | &#x640;&#x626;&#x640; | &#x640;&#x626;        |
| 'O   | &#x625;&#x64f; | &#x625;&#x64f; | &#x640;&#x625;&#x64f; | &#x640;&#x625;&#x64f; |
| 'U   | &#x624;        | &#x624;        | &#x640;&#x624;        | &#x640;&#x624;        |

\** Yeh with Hamzah is usually depicted without the two dots below.

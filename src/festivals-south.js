// South Indian and pan-Indian festivals added in Nov 2026 (English + Hindi).
// Lunar months: Amanta index 0 Chaitra … 11 Phalguna; tithi 1–15 Shukla, 16–30 Krishna.
// Solar months (sidereal signs): 0 Mesha/Chithirai/Medam … 9 Makara/Thai/Makaram … 11 Meena/Panguni/Meenam.
// Nakshatras: 0 Ashwini … 26 Revati.
// style = regional rule for solar months: 'tamil' (sankranti before sunset), 'kerala' (before 3/5 of daytime),
//         'sunrise' (first sunrise after the sankranti – Vishu).
// states = where the festival is mainly observed (state calendars and city pages); no `states` = all of India.
// Rules were checked against Drik Panchang (New Delhi) and state holiday lists for 2026 and 2027.
'use strict';

module.exports = function addSouth(add) {
  /* ======================= Solar new months ======================= */
  add({
    slug: 'bhogi', states: ['Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Karnataka', 'Puducherry'], type: 'sankranti', sign: 9, style: 'tamil', offset: -1, key: 'sankranti', skin: 'pongal', priority: 3, city: 'chennai',
    name: { en: 'Bhogi', hi: 'भोगी' },
    alt: { en: 'Bhogi Pandigai · Bhogi Panduga', hi: 'भोगी पंडिगई · भोगी पंडुगा' },
    lunar: { en: 'Last day of Margazhi (Dhanu) · Tamil Nadu, Andhra Pradesh, Telangana, Karnataka', hi: 'मार्गऴि (धनु) मास का अंतिम दिन · तमिलनाडु, आंध्र प्रदेश, तेलंगाना, कर्नाटक' },
    intro: {
      en: 'Bhogi is the first day of the Pongal and Sankranti festival, the day before the Sun enters Makara (Capricorn). Old and unused things are burnt in a bonfire at dawn to welcome a fresh start, and homes are cleaned and decorated with kolam.',
      hi: 'भोगी पोंगल और संक्रांति उत्सव का पहला दिन है, सूर्य के मकर राशि में प्रवेश से एक दिन पहले। भोर में पुरानी और बेकार चीज़ों को अलाव में जलाकर नई शुरुआत का स्वागत किया जाता है, और घरों की सफ़ाई करके कोलम से सजाया जाता है।',
    },
    rituals: {
      en: ['Bhogi bonfire (Bhogi mantalu) of old things before sunrise.', 'Cleaning and whitewashing the house; fresh kolam at the entrance.', 'In Andhra Pradesh and Telangana, "Bhogi pallu" (berries and coins) are showered on young children.'],
      hi: ['सूर्योदय से पहले पुरानी चीज़ों का भोगी अलाव (भोगी मंटलु)।', 'घर की सफ़ाई और पुताई; दरवाज़े पर नया कोलम।', 'आंध्र प्रदेश और तेलंगाना में छोटे बच्चों पर "भोगी पल्लु" (बेर और सिक्के) डाले जाते हैं।'],
    },
    faqs: {
      en: [['Is Bhogi always the day before Pongal?', 'Yes. Bhogi is the last day of the Tamil month Margazhi, and Pongal (Thai Pongal) is the first day of Thai, so they are always back to back.']],
      hi: [['क्या भोगी हमेशा पोंगल से एक दिन पहले होती है?', 'हाँ। भोगी तमिल मास मार्गऴि का अंतिम दिन है और पोंगल (थाई पोंगल) थाई मास का पहला दिन, इसलिए दोनों हमेशा लगातार आते हैं।']],
    },
  });

  add({
    slug: 'pongal', type: 'sankranti', sign: 9, style: 'tamil', offset: 0, key: 'sankranti', skin: 'pongal', priority: 2, city: 'chennai',
    name: { en: 'Pongal & Makara Sankranti', hi: 'पोंगल और मकर संक्रांति' },
    alt: { en: 'Thai Pongal · Sankranti · Uttarayan', hi: 'थाई पोंगल · संक्रांति · उत्तरायण' },
    lunar: { en: 'Thai 1 – Sun enters sidereal Makara (Capricorn) · All of South India', hi: 'थाई 1 – सूर्य का निरयण मकर राशि में प्रवेश · पूरा दक्षिण भारत' },
    intro: {
      en: 'Pongal, called Makara Sankranti in Andhra Pradesh, Telangana and Karnataka, is the harvest festival held when the Sun enters Makara (Capricorn) in the sidereal zodiac. It marks the start of the Tamil month Thai and of Uttarayan, the Sun\'s northward journey. Unlike most Hindu festivals it follows the Sun, so its date barely moves: 14 or 15 January.',
      hi: 'पोंगल, जिसे आंध्र प्रदेश, तेलंगाना और कर्नाटक में मकर संक्रांति कहते हैं, फ़सल का त्योहार है जो सूर्य के निरयण मकर राशि में प्रवेश पर मनाया जाता है। इससे तमिल मास थाई और उत्तरायण (सूर्य की उत्तर दिशा की यात्रा) शुरू होते हैं। ज़्यादातर हिंदू त्योहारों से अलग यह सूर्य पर आधारित है, इसलिए इसकी तारीख लगभग स्थिर रहती है: 14 या 15 जनवरी।',
    },
    rituals: {
      en: ['Pongal (rice cooked with milk and jaggery) is boiled in a new pot until it overflows, with shouts of "Pongalo Pongal!".', 'Offerings to the Sun God (Surya) in the morning.', 'Sugarcane, turmeric plants and colourful kolam / muggulu decorate homes.', 'In Karnataka, "ellu bella" (sesame and jaggery) is shared with friends.'],
      hi: ['नए बर्तन में दूध और गुड़ के साथ चावल (पोंगल) तब तक पकाया जाता है जब तक वह उफन न जाए, और "पोंगलो पोंगल!" कहा जाता है।', 'सुबह सूर्य देव को भोग।', 'गन्ना, हल्दी के पौधे और रंग-बिरंगे कोलम / मुग्गुलु से घर सजाए जाते हैं।', 'कर्नाटक में दोस्तों के साथ "एल्लु बेल्ला" (तिल और गुड़) बाँटा जाता है।'],
    },
    faqs: {
      en: [['Why is Pongal on 14 January in some years and 15 January in others?', 'Pongal is the first day of Thai. If the Sun enters Makara before sunset, that day is Thai 1; if it enters after sunset, Pongal moves to the next day. The exact entry time is shown above.'], ['Is Pongal the same as Makar Sankranti?', 'Yes, both mark the Sun entering Makara. Tamil Nadu celebrates it as Pongal over four days (Bhogi, Pongal, Mattu Pongal, Kaanum Pongal).']],
      hi: [['पोंगल कुछ सालों में 14 और कुछ में 15 जनवरी को क्यों होता है?', 'पोंगल थाई मास का पहला दिन है। अगर सूर्य सूर्यास्त से पहले मकर में प्रवेश करे तो वही दिन थाई 1 है; सूर्यास्त के बाद प्रवेश हो तो पोंगल अगले दिन होता है। प्रवेश का सही समय ऊपर दिया है।'], ['क्या पोंगल और मकर संक्रांति एक ही हैं?', 'हाँ, दोनों सूर्य के मकर में प्रवेश को मनाते हैं। तमिलनाडु में पोंगल चार दिन मनाया जाता है (भोगी, पोंगल, माट्टु पोंगल, काणुम पोंगल)।']],
    },
  });

  add({
    slug: 'mattu-pongal', states: ['Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Puducherry'], type: 'sankranti', sign: 9, style: 'tamil', offset: 1, key: 'sankranti', skin: 'pongal', priority: 3, city: 'chennai',
    name: { en: 'Mattu Pongal & Kanuma', hi: 'माट्टु पोंगल और कनुमा' },
    lunar: { en: 'Thai 2, the day after Pongal · Tamil Nadu, Andhra Pradesh, Telangana', hi: 'थाई 2, पोंगल के अगले दिन · तमिलनाडु, आंध्र प्रदेश, तेलंगाना' },
    intro: {
      en: 'Mattu Pongal honours cattle, the farmer\'s partners in the harvest. Cows and bulls are bathed, their horns painted and decorated with bells and garlands. In Andhra Pradesh and Telangana the same day is Kanuma, and in parts of Tamil Nadu Jallikattu is held around this day.',
      hi: 'माट्टु पोंगल पर मवेशियों का सम्मान किया जाता है, जो फ़सल में किसान के साथी हैं। गाय-बैलों को नहलाकर उनके सींग रंगे जाते हैं और घंटियों व मालाओं से सजाया जाता है। आंध्र प्रदेश और तेलंगाना में यही दिन कनुमा है, और तमिलनाडु के कुछ हिस्सों में इसी समय जल्लीकट्टू होता है।',
    },
    rituals: {
      en: ['Cattle are bathed, decorated and fed pongal and sugarcane.', 'Kanuma: a feast with family; many avoid travel on this day.', 'Kaanum Pongal (the next day) is for visiting relatives and outings.'],
      hi: ['मवेशियों को नहलाकर सजाया जाता है और पोंगल व गन्ना खिलाया जाता है।', 'कनुमा: परिवार के साथ भोज; कई लोग इस दिन यात्रा नहीं करते।', 'काणुम पोंगल (अगले दिन) रिश्तेदारों से मिलने और घूमने का दिन है।'],
    },
    faqs: {
      en: [['What is Kaanum Pongal?', 'The fourth day of the Pongal festival, the day after Mattu Pongal, when families visit relatives and go on outings.']],
      hi: [['काणुम पोंगल क्या है?', 'पोंगल उत्सव का चौथा दिन, माट्टु पोंगल के अगले दिन, जब परिवार रिश्तेदारों से मिलने और घूमने जाते हैं।']],
    },
  });

  add({
    slug: 'tamil-new-year', states: ['Tamil Nadu', 'Puducherry'], type: 'sankranti', sign: 0, style: 'tamil', offset: 0, key: 'sankranti', skin: 'pongal', priority: 2, city: 'chennai',
    name: { en: 'Tamil New Year (Puthandu)', hi: 'तमिल नव वर्ष (पुत्तांडु)' },
    alt: { en: 'Chithirai 1 · Varusha Pirappu', hi: 'चित्तिरै 1 · वरुष पिरप्पु' },
    lunar: { en: 'Chithirai 1 – Sun enters sidereal Mesha (Aries) · Tamil Nadu', hi: 'चित्तिरै 1 – सूर्य का निरयण मेष राशि में प्रवेश · तमिलनाडु' },
    intro: {
      en: 'Puthandu is the Tamil New Year, the first day of the month Chithirai, when the Sun enters Mesha (Aries) in the sidereal zodiac. It almost always falls on 14 April. Families start the year by looking at auspicious things (kani), visiting temples and reading the new year\'s panchangam.',
      hi: 'पुत्तांडु तमिल नव वर्ष है, चित्तिरै मास का पहला दिन, जब सूर्य निरयण मेष राशि में प्रवेश करता है। यह लगभग हमेशा 14 अप्रैल को होता है। परिवार शुभ चीज़ें (कणि) देखकर, मंदिर जाकर और नए साल का पंचांग पढ़कर साल की शुरुआत करते हैं।',
    },
    rituals: {
      en: ['Kani: a tray of fruits, flowers, gold, a mirror and betel is seen first thing in the morning.', 'Mango pachadi, a dish with sweet, sour, bitter and spicy tastes, symbolising the mix of life.', 'Temple visits and panchangam reading (panchanga sravanam).'],
      hi: ['कणि: सुबह सबसे पहले फल, फूल, सोना, दर्पण और पान की थाली देखी जाती है।', 'आम पचड़ी, जिसमें मीठा, खट्टा, कड़वा और तीखा स्वाद होता है, जीवन के मिश्रण का प्रतीक।', 'मंदिर दर्शन और नए पंचांग का पाठ।'],
    },
    faqs: {
      en: [['Is Tamil New Year the same day as Vishu?', 'They mark the same solar event. Tamil Nadu counts the day if the Sun enters Mesha before sunset, while Vishu is kept at the first sunrise after the entry, so Vishu is sometimes a day later.']],
      hi: [['क्या तमिल नव वर्ष और विशु एक ही दिन होते हैं?', 'दोनों एक ही सौर घटना पर आधारित हैं। तमिलनाडु में सूर्यास्त से पहले मेष प्रवेश हो तो वही दिन गिना जाता है, जबकि विशु प्रवेश के बाद के पहले सूर्योदय पर मनाया जाता है, इसलिए विशु कभी-कभी एक दिन बाद होता है।']],
    },
  });

  add({
    slug: 'vishu', states: ['Kerala', 'Puducherry'], type: 'sankranti', sign: 0, style: 'sunrise', offset: 0, key: 'sankranti', skin: 'onam', priority: 2, city: 'kochi',
    name: { en: 'Vishu', hi: 'विशु' },
    alt: { en: 'Medam 1 · Kerala New Year (spring)', hi: 'मेडम 1 · केरल का वसंत नव वर्ष' },
    lunar: { en: 'First sunrise after the Sun enters sidereal Mesha (Medam) · Kerala', hi: 'सूर्य के निरयण मेष (मेडम) में प्रवेश के बाद पहला सूर्योदय · केरल' },
    intro: {
      en: 'Vishu is Kerala\'s spring new year, celebrated at the first sunrise after the Sun enters Mesha (Medam). The day begins with the Vishukkani, an arrangement of auspicious items that is the first thing the family sees at dawn, followed by Vishukaineettam (gifts of money) and a grand Vishu sadya.',
      hi: 'विशु केरल का वसंत नव वर्ष है, जो सूर्य के मेष (मेडम) में प्रवेश के बाद पहले सूर्योदय पर मनाया जाता है। दिन की शुरुआत विशुक्कणि से होती है, शुभ वस्तुओं की सजावट जिसे परिवार भोर में सबसे पहले देखता है, फिर विशुकैनीट्टम (पैसे का उपहार) और विशु सद्या (भोज) होता है।',
    },
    rituals: {
      en: ['Vishukkani: golden konna flowers, cucumber, rice, fruits, gold, a mirror and a lit lamp before Krishna, seen with eyes closed until you reach it.', 'Vishukaineettam: elders give coins or notes to children.', 'Firecrackers and a vegetarian Vishu sadya.'],
      hi: ['विशुक्कणि: कृष्ण के सामने सुनहरे कोन्ना फूल, खीरा, चावल, फल, सोना, दर्पण और जलता दीपक, जिसे आँखें बंद करके वहाँ पहुँचकर देखा जाता है।', 'विशुकैनीट्टम: बड़े बच्चों को सिक्के या नोट देते हैं।', 'पटाखे और शाकाहारी विशु सद्या।'],
    },
    faqs: {
      en: [['Why is Vishu sometimes a day after Tamil New Year?', 'Vishukkani must be seen at a sunrise that is already in Medam. If the Sun enters Mesha after sunrise, Vishu moves to the next morning.']],
      hi: [['विशु कभी-कभी तमिल नव वर्ष के एक दिन बाद क्यों होता है?', 'विशुक्कणि ऐसे सूर्योदय पर देखा जाता है जो मेडम मास में हो। अगर सूर्य सूर्योदय के बाद मेष में प्रवेश करे, तो विशु अगली सुबह होता है।']],
    },
  });

  add({
    slug: 'aadi-perukku', states: ['Tamil Nadu', 'Puducherry'], type: 'sankranti', sign: 3, style: 'tamil', offset: 17, key: 'sankranti', skin: 'onam', priority: 3, city: 'tiruchirappalli',
    name: { en: 'Aadi Perukku', hi: 'आडि पेरुक्कु' },
    alt: { en: 'Aadi 18', hi: 'आडि 18' },
    lunar: { en: '18th day of the Tamil month Aadi (Karkata) · Tamil Nadu', hi: 'तमिल मास आडि (कर्क) का 18वाँ दिन · तमिलनाडु' },
    intro: {
      en: 'Aadi Perukku, on the 18th day of the Tamil month Aadi, thanks rivers for the monsoon floods that feed the fields. It is celebrated most grandly on the banks of the Kaveri, especially at Srirangam and Tiruchirappalli, with offerings to the river goddess.',
      hi: 'आडि पेरुक्कु, तमिल मास आडि के 18वें दिन, नदियों को मानसूनी बाढ़ के लिए धन्यवाद देने का पर्व है जो खेतों को सींचती है। यह सबसे भव्य रूप से कावेरी के तट पर, विशेषकर श्रीरंगम और तिरुचिरापल्ली में, नदी देवी को भेंट चढ़ाकर मनाया जाता है।',
    },
    rituals: {
      en: ['Families gather at river banks with a lamp, flowers and mixed rice dishes (chitranna).', 'Women tie new yellow threads (manjal kayiru).', 'Offerings floated on the river.'],
      hi: ['परिवार दीपक, फूल और मिश्रित चावल (चित्रान्न) लेकर नदी तट पर इकट्ठा होते हैं।', 'महिलाएँ नया पीला धागा (मंजल कयिरु) बाँधती हैं।', 'नदी में भेंट प्रवाहित की जाती है।'],
    },
    faqs: {
      en: [['Is Aadi Perukku always on 3 August?', 'Usually 2 or 3 August, because it is counted as the 18th day of the solar month Aadi.']],
      hi: [['क्या आडि पेरुक्कु हमेशा 3 अगस्त को होता है?', 'आमतौर पर 2 या 3 अगस्त को, क्योंकि यह सौर मास आडि का 18वाँ दिन गिना जाता है।']],
    },
  });

  /* ======================= Nakshatra festivals ======================= */
  add({
    slug: 'thai-poosam', states: ['Tamil Nadu', 'Kerala', 'Puducherry'], type: 'nakshatra-solar', nakshatra: 7, sign: 9, style: 'tamil', rule: 'sunset', key: 'tithi', skin: 'murugan', priority: 2, city: 'madurai',
    name: { en: 'Thai Poosam', hi: 'थाई पूसम' },
    alt: { en: 'Thaipusam', hi: 'थैपूसम' },
    lunar: { en: 'Pushya (Poosam) star in the Tamil month Thai · Tamil Nadu, Kerala', hi: 'तमिल मास थाई में पुष्य (पूसम) नक्षत्र · तमिलनाडु, केरल' },
    intro: {
      en: 'Thai Poosam honours Lord Murugan, who received the Vel (spear) from Goddess Parvati on this day. It falls when the Pushya (Poosam) star coincides with the Thai month, usually near the full moon. Devotees carry kavadi and walk to Murugan temples, especially Palani.',
      hi: 'थाई पूसम भगवान मुरुगन को समर्पित है, जिन्हें इसी दिन माता पार्वती से वेल (भाला) मिला था। यह तब मनाया जाता है जब थाई मास में पुष्य (पूसम) नक्षत्र हो, अक्सर पूर्णिमा के पास। भक्त कावड़ी उठाकर मुरुगन मंदिरों, विशेषकर पलनी, तक पैदल जाते हैं।',
    },
    rituals: {
      en: ['Kavadi: decorated arches carried on the shoulders as an offering.', 'Paal kudam: pots of milk carried to the temple for abhishekam.', 'Fasting and padayatra (walking pilgrimage) to Palani, Thiruchendur and other Murugan temples.'],
      hi: ['कावड़ी: कंधों पर सजी हुई मेहराब भेंट के रूप में।', 'पाल कुडम: अभिषेक के लिए दूध के घड़े मंदिर ले जाना।', 'व्रत और पलनी, तिरुचेंदूर व अन्य मुरुगन मंदिरों तक पदयात्रा।'],
    },
    faqs: {
      en: [['Is Thai Poosam on the full moon?', 'Often, but not always. The rule is the Pushya (Poosam) star in Thai, which usually falls within a day of the Thai full moon.']],
      hi: [['क्या थाई पूसम पूर्णिमा को होता है?', 'अक्सर, पर हमेशा नहीं। नियम थाई मास में पुष्य (पूसम) नक्षत्र का है, जो आमतौर पर थाई पूर्णिमा के एक दिन के भीतर पड़ता है।']],
    },
  });

  add({
    slug: 'masi-magam', states: ['Tamil Nadu', 'Puducherry'], type: 'nakshatra-solar', nakshatra: 9, sign: 10, style: 'tamil', rule: 'sunrise', key: 'tithi', skin: 'purnima', priority: 3, city: 'chennai',
    name: { en: 'Masi Magam', hi: 'मासि मगम' },
    lunar: { en: 'Magha (Magam) star in the Tamil month Masi · Tamil Nadu, Puducherry', hi: 'तमिल मास मासि में मघा (मगम) नक्षत्र · तमिलनाडु, पुडुचेरी' },
    intro: {
      en: 'Masi Magam is celebrated when the Magha (Magam) star falls in the Tamil month Masi, usually on the full moon. Temple deities are taken in procession to the sea, rivers and temple tanks for a holy bath (theerthavari). Once every twelve years it becomes the Mahamaham festival at Kumbakonam.',
      hi: 'मासि मगम तब मनाया जाता है जब तमिल मास मासि में मघा (मगम) नक्षत्र हो, आमतौर पर पूर्णिमा को। मंदिरों के देवताओं को शोभायात्रा में समुद्र, नदियों और सरोवरों तक पवित्र स्नान (तीर्थवारी) के लिए ले जाया जाता है। हर बारह साल में यह कुंभकोणम में महामहम उत्सव बन जाता है।',
    },
    rituals: { en: ['Deities carried to the seashore or temple tanks for theerthavari.', 'Holy dip by devotees alongside the deities.'], hi: ['तीर्थवारी के लिए देवताओं को समुद्र तट या मंदिर सरोवर तक ले जाना।', 'देवताओं के साथ भक्तों का पवित्र स्नान।'] },
    faqs: { en: [['What is Mahamaham?', 'The Masi Magam that comes once in twelve years, when Jupiter is in Simha, celebrated at the Mahamaham tank in Kumbakonam.']], hi: [['महामहम क्या है?', 'हर बारह साल में आने वाला मासि मगम, जब बृहस्पति सिंह राशि में हो, जिसे कुंभकोणम के महामहम सरोवर में मनाया जाता है।']] },
  });

  add({
    slug: 'attukal-pongala', states: ['Kerala'], type: 'nakshatra-solar', nakshatra: 10, sign: 10, style: 'kerala', rule: 'daytime', key: 'tithi', skin: 'pongal', priority: 3, city: 'thiruvananthapuram',
    name: { en: 'Attukal Pongala', hi: 'अट्टुकाल पोंगाला' },
    lunar: { en: 'Pooram star in the Malayalam month Kumbham · Kerala (Thiruvananthapuram)', hi: 'मलयालम मास कुंभम में पूरम नक्षत्र · केरल (तिरुवनंतपुरम)' },
    intro: {
      en: 'Attukal Pongala is one of the largest gatherings of women in the world. On the Pooram star in Kumbham, lakhs of women cook pongala (rice, jaggery and coconut) in clay pots along the streets of Thiruvananthapuram as an offering to Attukal Bhagavathy. The temple announces the exact muhurtham each year.',
      hi: 'अट्टुकाल पोंगाला दुनिया में महिलाओं के सबसे बड़े जमावड़ों में से है। कुंभम मास के पूरम नक्षत्र पर लाखों महिलाएँ तिरुवनंतपुरम की सड़कों पर मिट्टी के बर्तनों में पोंगाला (चावल, गुड़ और नारियल) पकाकर अट्टुकाल भगवती को अर्पित करती हैं। मंदिर हर साल सटीक मुहूर्त घोषित करता है।',
    },
    rituals: { en: ['The temple hearth is lit first, and the flame is passed to hearths along the roads.', 'Pongala is cooked in new clay pots and sprinkled with holy water by priests.'], hi: ['पहले मंदिर का चूल्हा जलाया जाता है, फिर लौ सड़कों के चूल्हों तक पहुँचाई जाती है।', 'नए मिट्टी के बर्तनों में पोंगाला पकाया जाता है और पुजारी उस पर पवित्र जल छिड़कते हैं।'] },
    faqs: { en: [['Is the date final?', 'The date here follows the Pooram-in-Kumbham rule. The temple trust confirms the date and muhurtham each year, so check its announcement.']], hi: [['क्या यह तारीख अंतिम है?', 'यहाँ दी गई तारीख कुंभम में पूरम नक्षत्र के नियम पर आधारित है। मंदिर ट्रस्ट हर साल तारीख और मुहूर्त की पुष्टि करता है, इसलिए उसकी घोषणा देखें।']] },
  });

  add({
    slug: 'panguni-uthiram', states: ['Tamil Nadu', 'Kerala', 'Puducherry'], type: 'nakshatra-solar', nakshatra: 11, sign: 11, style: 'tamil', rule: 'sunrise', key: 'tithi', skin: 'murugan', priority: 3, city: 'madurai',
    name: { en: 'Panguni Uthiram', hi: 'पंगुनि उत्तिरम' },
    lunar: { en: 'Uttara Phalguni (Uthiram) star in the Tamil month Panguni · Tamil Nadu, Kerala', hi: 'तमिल मास पंगुनि में उत्तरा फाल्गुनी (उत्तिरम) नक्षत्र · तमिलनाडु, केरल' },
    intro: {
      en: 'Panguni Uthiram falls on the Uthiram star in Panguni, usually the last full moon of the Tamil year. It celebrates divine weddings, of Shiva and Parvati, Murugan and Deivanai, and Rama and Sita, and is also the birth star of Lord Ayyappa. Murugan temples such as Palani hold big festivals.',
      hi: 'पंगुनि उत्तिरम पंगुनि मास के उत्तिरम नक्षत्र पर आता है, आमतौर पर तमिल साल की आखिरी पूर्णिमा पर। यह दिव्य विवाहों का उत्सव है, शिव-पार्वती, मुरुगन-देवयानी और राम-सीता का, और भगवान अय्यप्पा का जन्म नक्षत्र भी है। पलनी जैसे मुरुगन मंदिरों में बड़े उत्सव होते हैं।',
    },
    rituals: { en: ['Thirukalyanam (celestial wedding) ceremonies in temples.', 'Kavadi and padayatra to Murugan temples.'], hi: ['मंदिरों में तिरुकल्याणम (दिव्य विवाह) समारोह।', 'मुरुगन मंदिरों तक कावड़ी और पदयात्रा।'] },
    faqs: { en: [['Why is Panguni Uthiram considered auspicious for weddings?', 'Several divine marriages are said to have happened on this day, so it is seen as ideal for marriage-related prayers.']], hi: [['पंगुनि उत्तिरम विवाह के लिए शुभ क्यों माना जाता है?', 'माना जाता है कि कई दिव्य विवाह इसी दिन हुए, इसलिए विवाह से जुड़ी प्रार्थनाओं के लिए यह आदर्श है।']] },
  });

  add({
    slug: 'vaikasi-visakam', states: ['Tamil Nadu', 'Puducherry'], type: 'nakshatra-solar', nakshatra: 15, sign: 1, style: 'tamil', rule: 'sunrise', key: 'tithi', skin: 'murugan', priority: 3, city: 'madurai',
    name: { en: 'Vaikasi Visakam', hi: 'वैकासि विशाकम' },
    lunar: { en: 'Vishakha (Visakam) star in the Tamil month Vaikasi · Tamil Nadu', hi: 'तमिल मास वैकासि में विशाखा (विशाकम) नक्षत्र · तमिलनाडु' },
    intro: {
      en: 'Vaikasi Visakam is the birthday of Lord Murugan, celebrated on the Visakam star in the Tamil month Vaikasi, usually near the full moon. Murugan temples, especially Thiruchendur and the six Arupadai Veedu shrines, hold special abhishekams and processions.',
      hi: 'वैकासि विशाकम भगवान मुरुगन का जन्मदिन है, जो तमिल मास वैकासि में विशाकम नक्षत्र पर, आमतौर पर पूर्णिमा के पास, मनाया जाता है। मुरुगन मंदिरों, विशेषकर तिरुचेंदूर और छह अरुपडै वीडु मंदिरों में विशेष अभिषेक और शोभायात्राएँ होती हैं।',
    },
    rituals: { en: ['Milk abhishekam and paal kudam processions.', 'Fasting and reciting Kanda Sashti Kavacham.'], hi: ['दूध से अभिषेक और पाल कुडम शोभायात्रा।', 'व्रत और कंद षष्ठी कवचम का पाठ।'] },
    faqs: { en: [['Is Vaikasi Visakam also Buddha Purnima?', 'They are often close, since both fall near the full moon of Vaishakha, but Vaikasi Visakam follows the Visakam star.']], hi: [['क्या वैकासि विशाकम और बुद्ध पूर्णिमा एक हैं?', 'दोनों अक्सर पास होते हैं क्योंकि दोनों वैशाख पूर्णिमा के आसपास आते हैं, पर वैकासि विशाकम विशाकम नक्षत्र पर आधारित है।']] },
  });

  add({
    slug: 'onam', states: ['Kerala', 'Puducherry'], type: 'nakshatra-solar', nakshatra: 21, sign: 4, style: 'kerala', rule: 'sunrise', key: 'tithi', skin: 'onam', priority: 2, city: 'kochi',
    name: { en: 'Onam (Thiruvonam)', hi: 'ओणम (तिरुवोणम)' },
    alt: { en: 'Kerala\'s harvest festival', hi: 'केरल का फ़सल उत्सव' },
    lunar: { en: 'Thiruvonam (Shravana) star in the Malayalam month Chingam · Kerala', hi: 'मलयालम मास चिंगम में तिरुवोणम (श्रवण) नक्षत्र · केरल' },
    intro: {
      en: 'Onam is Kerala\'s biggest festival, welcoming the legendary King Mahabali, who is believed to visit his people every year. The main day, Thiruvonam, falls on the Thiruvonam (Shravana) star in the month Chingam, at the end of ten days of celebration that begin on Atham.',
      hi: 'ओणम केरल का सबसे बड़ा त्योहार है, जिसमें पौराणिक राजा महाबली का स्वागत किया जाता है, जिनके बारे में माना जाता है कि वे हर साल अपनी प्रजा से मिलने आते हैं। मुख्य दिन, तिरुवोणम, चिंगम मास में तिरुवोणम (श्रवण) नक्षत्र पर आता है, जो अत्तम से शुरू होने वाले दस दिन के उत्सव का अंत है।',
    },
    rituals: {
      en: ['Pookalam: a carpet of flowers laid in front of the home, growing bigger each day from Atham.', 'Onam sadya: a feast of 20+ dishes served on a banana leaf.', 'Vallam kali (snake boat races), Pulikali (tiger dance) and Thiruvathira kali.'],
      hi: ['पूक्कलम: घर के आगे फूलों की रंगोली, जो अत्तम से हर दिन बड़ी होती जाती है।', 'ओणम सद्या: केले के पत्ते पर 20 से ज़्यादा व्यंजनों का भोज।', 'वल्लम कली (सर्प नौका दौड़), पुलिकली (बाघ नृत्य) और तिरुवातिरा कली।'],
    },
    faqs: {
      en: [['When does Onam start?', 'Onam celebrations begin ten days earlier on the Atham star; Uthradom (first Onam) is the day before Thiruvonam.'], ['Is Onam on the same date every year?', 'No. It follows the Thiruvonam star in Chingam, so it falls between late August and mid-September.']],
      hi: [['ओणम कब शुरू होता है?', 'ओणम उत्सव दस दिन पहले अत्तम नक्षत्र पर शुरू होता है; उत्राडम (पहला ओणम) तिरुवोणम से एक दिन पहले होता है।'], ['क्या ओणम हर साल एक ही तारीख को होता है?', 'नहीं। यह चिंगम मास के तिरुवोणम नक्षत्र पर आधारित है, इसलिए अगस्त के अंत से मध्य सितंबर के बीच आता है।']],
    },
  });

  add({
    slug: 'karthigai-deepam', states: ['Tamil Nadu', 'Kerala', 'Puducherry'], type: 'nakshatra-solar', nakshatra: 2, sign: 7, style: 'tamil', rule: 'sunrise', key: 'moonrise', skin: 'deepam', priority: 2, city: 'chennai',
    name: { en: 'Karthigai Deepam', hi: 'कार्तिगै दीपम' },
    alt: { en: 'Thiruvannamalai Maha Deepam', hi: 'तिरुवन्नामलै महा दीपम' },
    lunar: { en: 'Krittika (Karthigai) star in the Tamil month Karthigai · Tamil Nadu, Kerala', hi: 'तमिल मास कार्तिगै में कृत्तिका (कार्तिगै) नक्षत्र · तमिलनाडु, केरल' },
    intro: {
      en: 'Karthigai Deepam is the Tamil festival of lamps, held when the Krittika (Karthigai) star falls in the month Karthigai, usually on or near the full moon. Homes are lit with rows of agal vilakku (clay lamps), and the Maha Deepam, a huge fire, is lit on top of the Arunachala hill at Thiruvannamalai at dusk.',
      hi: 'कार्तिगै दीपम तमिल दीपोत्सव है, जो कार्तिगै मास में कृत्तिका (कार्तिगै) नक्षत्र पर, आमतौर पर पूर्णिमा के आसपास, मनाया जाता है। घरों को अगल विलक्कु (मिट्टी के दीयों) की कतारों से रोशन किया जाता है, और शाम को तिरुवन्नामलै में अरुणाचल पहाड़ी की चोटी पर विशाल महा दीपम जलाया जाता है।',
    },
    rituals: {
      en: ['Rows of agal vilakku lit around the home at dusk.', 'Maha Deepam lit on Arunachala hill, visible for miles.', 'Sweets such as pori urundai and appam are offered.'],
      hi: ['शाम को घर के चारों ओर अगल विलक्कु की कतारें जलाना।', 'अरुणाचल पहाड़ी पर महा दीपम, जो मीलों दूर से दिखता है।', 'पोरी उरुंडै और अप्पम जैसी मिठाइयों का भोग।'],
    },
    faqs: {
      en: [['When is the Maha Deepam lit at Thiruvannamalai?', 'At dusk, around 6 PM, after the Bharani Deepam is lit in the temple early that morning.'], ['Is Karthigai Deepam the same as Kartik Purnima?', 'They are often on the same day, but Karthigai Deepam follows the Krittika star in the solar month Karthigai, so they can differ.']],
      hi: [['तिरुवन्नामलै में महा दीपम कब जलाया जाता है?', 'शाम लगभग 6 बजे, उसी दिन सुबह मंदिर में भरणी दीपम जलाने के बाद।'], ['क्या कार्तिगै दीपम और कार्तिक पूर्णिमा एक हैं?', 'ये अक्सर एक ही दिन होते हैं, पर कार्तिगै दीपम सौर मास कार्तिगै में कृत्तिका नक्षत्र पर आधारित है, इसलिए अलग भी हो सकते हैं।']],
    },
  });

  add({
    slug: 'arudra-darshan', states: ['Tamil Nadu', 'Kerala', 'Puducherry'], type: 'nakshatra-solar', nakshatra: 5, sign: 8, style: 'tamil', rule: 'sunrise', key: 'tithi', skin: 'shiva', priority: 3, city: 'chennai',
    name: { en: 'Arudra Darshan', hi: 'आरुद्रा दर्शन' },
    alt: { en: 'Thiruvathirai · Thiruvathira', hi: 'तिरुवादिरै · तिरुवातिरा' },
    lunar: { en: 'Ardra (Thiruvathirai) star in the Tamil month Margazhi · Tamil Nadu, Kerala', hi: 'तमिल मास मार्गऴि में आर्द्रा (तिरुवादिरै) नक्षत्र · तमिलनाडु, केरल' },
    intro: {
      en: 'Arudra Darshan celebrates the cosmic dance of Lord Shiva as Nataraja, on the Ardra (Thiruvathirai) star in the month Margazhi, usually at or near the full moon. The festival is grandest at the Chidambaram Nataraja temple. In Kerala the same day is Thiruvathira, when women perform Thiruvathira kali.',
      hi: 'आरुद्रा दर्शन मार्गऴि मास में आर्द्रा (तिरुवादिरै) नक्षत्र पर, आमतौर पर पूर्णिमा के आसपास, भगवान शिव के नटराज रूप के ब्रह्मांडीय नृत्य का उत्सव है। यह चिदंबरम नटराज मंदिर में सबसे भव्य होता है। केरल में यही दिन तिरुवातिरा है, जब महिलाएँ तिरुवातिरा कली नृत्य करती हैं।',
    },
    rituals: { en: ['Pre-dawn abhishekam and darshan of Nataraja.', 'Thiruvathirai kali, a sweet of rice and jaggery, with ezhu kari kootu.'], hi: ['भोर से पहले नटराज का अभिषेक और दर्शन।', 'तिरुवादिरै कली (चावल और गुड़ की मिठाई) और एऴु करी कूट्टु।'] },
    faqs: { en: [['Can Arudra Darshan happen twice in a calendar year?', 'Yes. Margazhi spans December and January, so a year can have one in early January and another in late December.']], hi: [['क्या आरुद्रा दर्शन एक कैलेंडर साल में दो बार हो सकता है?', 'हाँ। मार्गऴि दिसंबर और जनवरी में फैला होता है, इसलिए एक साल में जनवरी की शुरुआत और दिसंबर के अंत दोनों में हो सकता है।']] },
  });

  /* ======================= Tithi in a solar month ======================= */
  add({
    slug: 'chitra-pournami', states: ['Tamil Nadu', 'Puducherry'], type: 'tithi-solar', tithi: 15, sign: 0, style: 'tamil', rule: 'sunrise', key: 'moonrise', skin: 'purnima', priority: 3, city: 'madurai',
    name: { en: 'Chitra Pournami', hi: 'चित्रा पौर्णमी' },
    alt: { en: 'Chithirai Pournami', hi: 'चित्तिरै पौर्णमी' },
    lunar: { en: 'Full moon in the Tamil month Chithirai · Tamil Nadu', hi: 'तमिल मास चित्तिरै की पूर्णिमा · तमिलनाडु' },
    intro: {
      en: 'Chitra Pournami is the full moon of the Tamil month Chithirai. It is dedicated to Chitragupta, who keeps the record of our deeds, and coincides with the Chithirai festival at Madurai, when Lord Kallazhagar enters the Vaigai river. Many families picnic under the bright full moon by rivers and beaches.',
      hi: 'चित्रा पौर्णमी तमिल मास चित्तिरै की पूर्णिमा है। यह कर्मों का लेखा रखने वाले चित्रगुप्त को समर्पित है, और मदुरै के चित्तिरै उत्सव के साथ आती है, जब भगवान कल्लऴगर वैगै नदी में प्रवेश करते हैं। कई परिवार नदियों और समुद्र तटों पर चाँदनी में भोजन करते हैं।',
    },
    rituals: { en: ['Chitragupta puja and charity.', 'Girivalam (walking around the hill) at Thiruvannamalai on the full moon night.'], hi: ['चित्रगुप्त पूजा और दान।', 'पूर्णिमा की रात तिरुवन्नामलै में गिरिवलम (पहाड़ी की परिक्रमा)।'] },
    faqs: { en: [['What time does the moon rise on Chitra Pournami?', 'Around sunset; the moonrise time for your city is shown above.']], hi: [['चित्रा पौर्णमी पर चाँद कब निकलता है?', 'सूर्यास्त के आसपास; आपके शहर का चंद्रोदय समय ऊपर दिया है।']] },
  });

  add({
    slug: 'aadi-amavasai', states: ['Tamil Nadu', 'Kerala', 'Puducherry'], type: 'tithi-solar', tithi: 30, sign: 3, style: 'tamil', rule: 'sunrise', key: 'tithi', skin: 'diwali', priority: 3, city: 'chennai',
    name: { en: 'Aadi Amavasai', hi: 'आडि अमावसै' },
    alt: { en: 'Karkidaka Vavu (Kerala)', hi: 'कर्किडक वावु (केरल)' },
    lunar: { en: 'New moon in the Tamil month Aadi (Karkata) · Tamil Nadu, Kerala', hi: 'तमिल मास आडि (कर्क) की अमावस्या · तमिलनाडु, केरल' },
    intro: {
      en: 'Aadi Amavasai, the new moon of the month Aadi, is one of the most important days to remember ancestors. Families offer tarpanam at the sea, rivers and temple tanks, such as Rameswaram and Kanyakumari. In Kerala the same day is Karkidaka Vavu, with Vavu bali on the banks of rivers.',
      hi: 'आडि अमावसै, आडि मास की अमावस्या, पितरों को याद करने के सबसे महत्वपूर्ण दिनों में से है। परिवार समुद्र, नदियों और मंदिर सरोवरों, जैसे रामेश्वरम और कन्याकुमारी, पर तर्पण करते हैं। केरल में यही दिन कर्किडक वावु है, जब नदी तटों पर वावु बलि दी जाती है।',
    },
    rituals: { en: ['Tarpanam (water and sesame offerings) for ancestors.', 'Feeding crows and the needy.'], hi: ['पितरों के लिए तर्पण (जल और तिल)।', 'कौओं और ज़रूरतमंदों को भोजन।'] },
    faqs: { en: [['Is Aadi Amavasai the same as Mahalaya Amavasya?', 'No. Aadi Amavasai is in July–August; Mahalaya Amavasya comes about two months later, at the end of Pitru Paksha.']], hi: [['क्या आडि अमावसै और महालया अमावस्या एक हैं?', 'नहीं। आडि अमावसै जुलाई–अगस्त में होती है; महालया अमावस्या लगभग दो महीने बाद, पितृ पक्ष के अंत में आती है।']] },
  });

  add({
    slug: 'skanda-sashti', states: ['Tamil Nadu', 'Puducherry'], type: 'tithi-solar', tithi: 6, sign: 6, style: 'tamil', rule: 'sunrise', key: 'tithi', skin: 'murugan', priority: 3, city: 'chennai',
    name: { en: 'Skanda Sashti (Soora Samharam)', hi: 'स्कंद षष्ठी (सूर सम्हारम)' },
    lunar: { en: 'Shukla Shashthi in the Tamil month Aippasi · Tamil Nadu', hi: 'तमिल मास ऐप्पसि की शुक्ल षष्ठी · तमिलनाडु' },
    intro: {
      en: 'Skanda Sashti is the six-day festival of Lord Murugan that ends with Soora Samharam, the re-enactment of Murugan defeating the demon Surapadman. The biggest celebration is on the beach at Thiruchendur. Devotees fast for six days after Deepavali, breaking the fast after Soora Samharam.',
      hi: 'स्कंद षष्ठी भगवान मुरुगन का छह दिन का उत्सव है, जो सूर सम्हारम पर समाप्त होता है, जब मुरुगन द्वारा असुर सूरपद्मन के वध का मंचन होता है। सबसे बड़ा उत्सव तिरुचेंदूर के समुद्र तट पर होता है। भक्त दीपावली के बाद छह दिन व्रत रखते हैं और सूर सम्हारम के बाद व्रत खोलते हैं।',
    },
    rituals: { en: ['Six-day fast and recitation of Kanda Sashti Kavacham.', 'Soora Samharam enacted in the evening at Murugan temples.', 'Thirukalyanam the next day.'], hi: ['छह दिन का व्रत और कंद षष्ठी कवचम का पाठ।', 'शाम को मुरुगन मंदिरों में सूर सम्हारम का मंचन।', 'अगले दिन तिरुकल्याणम।'] },
    faqs: { en: [['When does Skanda Sashti begin?', 'Six days earlier, on the day after the Aippasi new moon (the day after Deepavali in most years).']], hi: [['स्कंद षष्ठी कब शुरू होती है?', 'छह दिन पहले, ऐप्पसि अमावस्या के अगले दिन (ज़्यादातर सालों में दीपावली के अगले दिन)।']] },
  });

  add({
    slug: 'vaikunta-ekadasi', states: ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Puducherry'], type: 'tithi-solar', tithi: 11, sign: 8, style: 'tamil', rule: 'sunrise', key: 'tithi', skin: 'purnima', priority: 2, city: 'chennai',
    name: { en: 'Vaikunta Ekadasi', hi: 'वैकुंठ एकादशी' },
    alt: { en: 'Mukkoti Ekadasi', hi: 'मुक्कोटि एकादशी' },
    lunar: { en: 'Shukla Ekadashi in the solar month Dhanu (Margazhi) · All of South India', hi: 'सौर मास धनु (मार्गऴि) की शुक्ल एकादशी · पूरा दक्षिण भारत' },
    intro: {
      en: 'Vaikunta Ekadasi is the most important Ekadashi for Vaishnavas in South India. On this day the "gate to Vaikuntam" (Vaikunta Dwaram or Paramapada Vasal) is opened at Vishnu temples such as Srirangam and Tirumala, and devotees pass through it at dawn. It is the Shukla Ekadashi that falls in the solar month Dhanu, so some years have none and some have two.',
      hi: 'वैकुंठ एकादशी दक्षिण भारत में वैष्णवों की सबसे महत्वपूर्ण एकादशी है। इस दिन श्रीरंगम और तिरुमला जैसे विष्णु मंदिरों में "वैकुंठ द्वार" (परमपद वासल) खोला जाता है, और भक्त भोर में उससे गुज़रते हैं। यह सौर मास धनु में पड़ने वाली शुक्ल एकादशी है, इसलिए किसी साल यह नहीं आती और किसी साल दो बार आती है।',
    },
    rituals: { en: ['Fasting and night-long vigil (jagaran).', 'Passing through Vaikunta Dwaram at dawn.', 'Parana (breaking the fast) on Dwadashi morning.'], hi: ['व्रत और रात भर जागरण।', 'भोर में वैकुंठ द्वार से गुज़रना।', 'द्वादशी की सुबह पारण।'] },
    faqs: { en: [['Why is there no Vaikunta Ekadasi in some years?', 'Because it must fall while the Sun is in Dhanu (mid-December to mid-January). Depending on the lunar cycle, a calendar year can have zero, one or two.']], hi: [['कुछ सालों में वैकुंठ एकादशी क्यों नहीं होती?', 'क्योंकि यह तभी होती है जब सूर्य धनु राशि में हो (मध्य दिसंबर से मध्य जनवरी)। चंद्र चक्र के अनुसार एक कैलेंडर साल में यह शून्य, एक या दो बार आ सकती है।']] },
  });

  /* ======================= Lunar (tithi) festivals ======================= */
  add({
    slug: 'maha-shivaratri', type: 'hindu', month: 10, tithi: 29, rule: 'midnight', key: 'tithi', skin: 'shiva', priority: 2,
    name: { en: 'Maha Shivaratri', hi: 'महाशिवरात्रि' },
    lunar: { en: 'Magha Krishna Chaturdashi (Amanta) · Phalguna (Purnimanta) · All India', hi: 'माघ कृष्ण चतुर्दशी (अमांत) · फाल्गुन (पूर्णिमांत) · पूरा भारत' },
    intro: {
      en: 'Maha Shivaratri, the great night of Lord Shiva, is observed on the Krishna Chaturdashi when it prevails at midnight (nishita kaal), a day before the new moon. Devotees fast, keep awake through the night and offer abhishekam to the Shiva linga in four prahars (watches) of the night.',
      hi: 'महाशिवरात्रि, भगवान शिव की महान रात्रि, उस कृष्ण चतुर्दशी को मनाई जाती है जो मध्यरात्रि (निशीथ काल) में हो, अमावस्या से एक दिन पहले। भक्त व्रत रखते हैं, रात भर जागते हैं और रात के चार प्रहरों में शिवलिंग का अभिषेक करते हैं।',
    },
    rituals: { en: ['Fasting through the day and night.', 'Abhishekam with milk, water, honey and bilva leaves in four prahars.', 'Chanting "Om Namah Shivaya" and night-long jagaran.'], hi: ['दिन और रात व्रत।', 'चार प्रहरों में दूध, जल, शहद और बेलपत्र से अभिषेक।', '"ॐ नमः शिवाय" का जाप और रात भर जागरण।'] },
    faqs: { en: [['When is the main puja on Maha Shivaratri?', 'The nishita kaal puja around midnight is considered most important. Night puja is done in four prahars from sunset to sunrise.']], hi: [['महाशिवरात्रि पर मुख्य पूजा कब होती है?', 'मध्यरात्रि के आसपास निशीथ काल की पूजा सबसे महत्वपूर्ण मानी जाती है। सूर्यास्त से सूर्योदय तक चार प्रहरों में पूजा होती है।']] },
  });

  add({
    slug: 'ugadi', states: ['Andhra Pradesh', 'Telangana', 'Karnataka'], type: 'hindu', month: 0, tithi: 1, rule: 'sunrise', key: 'tithi', skin: 'teej', priority: 2, city: 'hyderabad',
    name: { en: 'Ugadi', hi: 'उगादि' },
    alt: { en: 'Yugadi · Telugu & Kannada New Year (Gudi Padwa in Maharashtra)', hi: 'युगादि · तेलुगु और कन्नड़ नव वर्ष (महाराष्ट्र में गुड़ी पड़वा)' },
    lunar: { en: 'Chaitra Shukla Pratipada · Andhra Pradesh, Telangana, Karnataka', hi: 'चैत्र शुक्ल प्रतिपदा · आंध्र प्रदेश, तेलंगाना, कर्नाटक' },
    intro: {
      en: 'Ugadi is the New Year of Andhra Pradesh, Telangana and Karnataka, on the first day of the bright fortnight of Chaitra, the day after the new moon. It follows the lunar calendar, so it moves between mid-March and mid-April. The same day is Gudi Padwa in Maharashtra.',
      hi: 'उगादि आंध्र प्रदेश, तेलंगाना और कर्नाटक का नव वर्ष है, जो चैत्र शुक्ल पक्ष के पहले दिन, अमावस्या के अगले दिन, मनाया जाता है। यह चंद्र पंचांग पर आधारित है, इसलिए मार्च के मध्य से अप्रैल के मध्य के बीच आता है। महाराष्ट्र में यही दिन गुड़ी पड़वा है।',
    },
    rituals: { en: ['Ugadi pachadi / bevu-bella: neem, jaggery, tamarind, raw mango, salt and chilli, for the six tastes of life.', 'Mango-leaf torans on doorways and an oil bath in the morning.', 'Panchanga sravanam: listening to the new year\'s predictions.'], hi: ['उगादि पचड़ी / बेवु-बेल्ला: नीम, गुड़, इमली, कच्चा आम, नमक और मिर्च, जीवन के छह स्वादों के लिए।', 'दरवाज़ों पर आम के पत्तों के तोरण और सुबह तेल स्नान।', 'पंचांग श्रवण: नए साल का भविष्यफल सुनना।'] },
    faqs: { en: [['Is Ugadi the same day as Gudi Padwa?', 'Yes, both fall on Chaitra Shukla Pratipada.']], hi: [['क्या उगादि और गुड़ी पड़वा एक ही दिन होते हैं?', 'हाँ, दोनों चैत्र शुक्ल प्रतिपदा को आते हैं।']] },
  });

  add({
    slug: 'ram-navami', type: 'hindu', month: 0, tithi: 9, rule: 'midday', key: 'tithi', skin: 'rakhi', priority: 2,
    name: { en: 'Ram Navami', hi: 'राम नवमी' },
    alt: { en: 'Sri Rama Navami', hi: 'श्री राम नवमी' },
    lunar: { en: 'Chaitra Shukla Navami · All India', hi: 'चैत्र शुक्ल नवमी · पूरा भारत' },
    intro: {
      en: 'Ram Navami celebrates the birth of Lord Rama, on the ninth day of the bright fortnight of Chaitra. Rama is believed to have been born at midday, so the day is chosen by the Navami tithi prevailing at noon. In Andhra Pradesh and Telangana, the Sita–Rama Kalyanam at Bhadrachalam is the highlight.',
      hi: 'राम नवमी भगवान राम के जन्म का उत्सव है, चैत्र शुक्ल पक्ष की नवमी को। माना जाता है कि राम का जन्म मध्याह्न में हुआ, इसलिए दिन उस नवमी तिथि से तय होता है जो दोपहर में हो। आंध्र प्रदेश और तेलंगाना में भद्राचलम का सीता–राम कल्याणम मुख्य आकर्षण है।',
    },
    rituals: { en: ['Madhyahna (midday) puja and Rama katha.', 'Panakam (jaggery and pepper drink) and neer mor in South India.', 'Sita–Rama Kalyanam (wedding ceremony) in temples.'], hi: ['मध्याह्न पूजा और राम कथा।', 'दक्षिण भारत में पानकम (गुड़ और काली मिर्च का शरबत) और नीर मोर।', 'मंदिरों में सीता–राम कल्याणम (विवाह समारोह)।'] },
    faqs: { en: [['Why do some calendars show Ram Navami on two days?', 'When Navami spans two middays, Smarta and Vaishnava calendars may pick different days. This site uses the Navami at midday.']], hi: [['कुछ पंचांगों में राम नवमी दो दिन क्यों दिखती है?', 'जब नवमी दो दोपहरों में फैली हो, तो स्मार्त और वैष्णव पंचांग अलग दिन चुन सकते हैं। यह साइट दोपहर की नवमी का नियम अपनाती है।']] },
  });

  add({
    slug: 'varalakshmi-vratam', states: ['Karnataka', 'Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Puducherry'], type: 'weekday-before', month: 4, tithi: 15, rule: 'sunrise', weekday: 5, key: 'tithi', skin: 'rakhi', priority: 2, city: 'bengaluru',
    name: { en: 'Varalakshmi Vratam', hi: 'वरलक्ष्मी व्रत' },
    alt: { en: 'Varamahalakshmi', hi: 'वरमहालक्ष्मी' },
    lunar: { en: 'The Friday on or before Shravana Purnima · Karnataka, Andhra Pradesh, Telangana, Tamil Nadu', hi: 'श्रावण पूर्णिमा को या उससे पहले का शुक्रवार · कर्नाटक, आंध्र प्रदेश, तेलंगाना, तमिलनाडु' },
    intro: {
      en: 'Varalakshmi Vratam is a puja to Goddess Lakshmi, the giver of boons (vara), kept by married women for the well-being of their families. It is observed on the Friday on or just before the full moon of Shravana. A kalasha decorated as the Goddess is worshipped and a sacred yellow thread is tied on the wrist.',
      hi: 'वरलक्ष्मी व्रत वर (वरदान) देने वाली देवी लक्ष्मी की पूजा है, जिसे विवाहित महिलाएँ परिवार के कल्याण के लिए रखती हैं। यह श्रावण पूर्णिमा को या उससे ठीक पहले के शुक्रवार को किया जाता है। देवी के रूप में सजे कलश की पूजा होती है और कलाई पर पवित्र पीला धागा बाँधा जाता है।',
    },
    rituals: { en: ['A kalasha is dressed as Goddess Lakshmi with a face, saree and jewellery.', 'Nombu charadu: the yellow thread tied on the right wrist.', 'Neighbours are invited for haldi-kumkum and prasadam.'], hi: ['कलश को चेहरे, साड़ी और गहनों के साथ देवी लक्ष्मी के रूप में सजाया जाता है।', 'नोम्बु चरडु: दाहिनी कलाई पर पीला धागा।', 'पड़ोसिनों को हल्दी-कुमकुम और प्रसाद के लिए बुलाया जाता है।'] },
    faqs: { en: [['What if Shravana Purnima itself is a Friday?', 'Then that Friday is Varalakshmi Vratam, as in 2026.']], hi: [['अगर श्रावण पूर्णिमा ही शुक्रवार हो तो?', 'तब वही शुक्रवार वरलक्ष्मी व्रत होता है, जैसे 2026 में।']] },
  });

  add({
    slug: 'krishna-janmashtami', type: 'hindu', month: 4, tithi: 23, rule: 'sunrise', key: 'tithi', skin: 'purnima', priority: 2,
    name: { en: 'Krishna Janmashtami (Gokulashtami)', hi: 'कृष्ण जन्माष्टमी (गोकुलाष्टमी)' },
    alt: { en: 'Krishna Jayanthi · Sri Jayanthi · Ashtami Rohini', hi: 'कृष्ण जयंती · श्री जयंती · अष्टमी रोहिणी' },
    lunar: { en: 'Shravana Krishna Ashtami (Amanta) · Bhadrapada (Purnimanta) · All India', hi: 'श्रावण कृष्ण अष्टमी (अमांत) · भाद्रपद (पूर्णिमांत) · पूरा भारत' },
    intro: {
      en: 'Krishna Janmashtami celebrates the birth of Lord Krishna at midnight on the eighth day of the dark fortnight. In Tamil Nadu it is Gokulashtami or Krishna Jayanthi, with tiny footprints drawn from the door to the puja room; in Kerala it is Ashtami Rohini. This site gives the day on which Ashtami prevails at sunrise, which matches the South Indian holiday lists.',
      hi: 'कृष्ण जन्माष्टमी कृष्ण पक्ष की अष्टमी की मध्यरात्रि को भगवान कृष्ण के जन्म का उत्सव है। तमिलनाडु में यह गोकुलाष्टमी या कृष्ण जयंती है, जब दरवाज़े से पूजा घर तक नन्हे पैरों के निशान बनाए जाते हैं; केरल में यह अष्टमी रोहिणी है। यह साइट वह दिन देती है जब सूर्योदय पर अष्टमी हो, जो दक्षिण भारत की छुट्टियों की सूची से मेल खाता है।',
    },
    rituals: { en: ['Fasting until midnight, when Krishna\'s birth is celebrated.', 'Little footprints of Krishna drawn with rice flour across the home.', 'Seedai, murukku, butter and aval offered; Uriyadi / Dahi Handi.'], hi: ['मध्यरात्रि तक व्रत, जब कृष्ण जन्म मनाया जाता है।', 'घर भर में चावल के आटे से कृष्ण के नन्हे पैरों के निशान।', 'सीडै, मुरुक्कु, मक्खन और पोहा का भोग; उरियडी / दही हांडी।'] },
    faqs: { en: [['Why does North India sometimes celebrate Janmashtami a day earlier?', 'Smarta calendars in the North choose the day with Ashtami at midnight, while many South Indian and Vaishnava calendars use Ashtami at sunrise or the Rohini star. When these fall on different days, the dates differ by one day.']], hi: [['उत्तर भारत में जन्माष्टमी कभी-कभी एक दिन पहले क्यों होती है?', 'उत्तर के स्मार्त पंचांग मध्यरात्रि की अष्टमी वाला दिन चुनते हैं, जबकि दक्षिण और वैष्णव पंचांग सूर्योदय की अष्टमी या रोहिणी नक्षत्र को मानते हैं। जब ये अलग दिन पड़ें, तो तारीख एक दिन अलग हो जाती है।']] },
  });

  add({
    slug: 'navratri', type: 'hindu', month: 6, tithi: 1, rule: 'midday', key: 'tithi', skin: 'karva', priority: 2,
    name: { en: 'Navaratri begins', hi: 'नवरात्रि आरंभ' },
    alt: { en: 'Sharad Navratri · Golu / Bommai Kolu · Bathukamma · Mysuru Dasara', hi: 'शारदीय नवरात्रि · गोलू / बोम्मै कोलु · बतुकम्मा · मैसूर दशहरा' },
    lunar: { en: 'Ashvin Shukla Pratipada · All India', hi: 'आश्विन शुक्ल प्रतिपदा · पूरा भारत' },
    intro: {
      en: 'Sharad Navaratri, nine nights of the Goddess, begins on the first day of the bright fortnight of Ashvin, right after Mahalaya Amavasya. In Tamil Nadu and Karnataka homes set up Golu (Bommai Kolu), steps of dolls; Telangana celebrates Bathukamma with flower stacks; Mysuru holds its famous Dasara.',
      hi: 'शारदीय नवरात्रि, देवी की नौ रातें, आश्विन शुक्ल पक्ष के पहले दिन, महालया अमावस्या के ठीक बाद शुरू होती है। तमिलनाडु और कर्नाटक में घरों में गोलू (बोम्मै कोलु), गुड़ियों की सीढ़ियाँ सजाई जाती हैं; तेलंगाना में फूलों के ढेर से बतुकम्मा मनाया जाता है; मैसूर में प्रसिद्ध दशहरा होता है।',
    },
    rituals: { en: ['Ghatasthapana / kalasha sthapana on the first morning.', 'Golu with sundal prasadam and visits to neighbours\' homes.', 'Bathukamma songs and dance around flower stacks (Telangana).'], hi: ['पहली सुबह घटस्थापना / कलश स्थापना।', 'गोलू, सुंडल प्रसाद और पड़ोसियों के घर जाना।', 'फूलों के ढेर के चारों ओर बतुकम्मा गीत और नृत्य (तेलंगाना)।'] },
    faqs: { en: [['When are Saraswati Puja, Ayudha Puja and Vijayadashami?', 'At the end of Navaratri: Saraswati and Ayudha Puja on Navami, Vijayadashami the next day (sometimes the same day). See those pages for dates.']], hi: [['सरस्वती पूजा, आयुध पूजा और विजयादशमी कब हैं?', 'नवरात्रि के अंत में: नवमी को सरस्वती और आयुध पूजा, अगले दिन (कभी-कभी उसी दिन) विजयादशमी। तारीखों के लिए उनके पेज देखें।']] },
  });

  add({
    slug: 'ayudha-puja', states: ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Puducherry'], type: 'hindu', month: 6, tithi: 9, rule: 'sunrise', key: 'tithi', skin: 'karva', priority: 2, city: 'chennai',
    name: { en: 'Saraswati & Ayudha Puja', hi: 'सरस्वती और आयुध पूजा' },
    alt: { en: 'Maha Navami · Ayutha Poojai', hi: 'महानवमी · आयुध पूजै' },
    lunar: { en: 'Ashvin Shukla Navami · Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana', hi: 'आश्विन शुक्ल नवमी · तमिलनाडु, कर्नाटक, केरल, आंध्र प्रदेश, तेलंगाना' },
    intro: {
      en: 'On the ninth day of Navaratri, South India worships Goddess Saraswati and honours tools of work (ayudha): books, musical instruments, machines, vehicles and computers are cleaned, decorated with sandal paste and kumkum, and rested for the day. The day is chosen by the Navami tithi at sunrise, as in the Tamil Nadu holiday list.',
      hi: 'नवरात्रि के नौवें दिन दक्षिण भारत में देवी सरस्वती की पूजा होती है और काम के औज़ारों (आयुध) का सम्मान किया जाता है: किताबें, वाद्य यंत्र, मशीनें, वाहन और कंप्यूटर साफ़ करके चंदन और कुमकुम से सजाए जाते हैं और उस दिन आराम दिया जाता है। दिन सूर्योदय की नवमी तिथि से तय होता है, जैसा तमिलनाडु की छुट्टियों की सूची में है।',
    },
    rituals: { en: ['Books and instruments placed before Saraswati (pooja vaippu).', 'Vehicles and tools washed and decorated; a pumpkin broken to ward off evil.', 'Sundal, pori and sweets offered.'], hi: ['किताबें और वाद्य यंत्र सरस्वती के सामने रखना (पूजा वैप्पु)।', 'वाहन और औज़ार धोकर सजाना; बुराई दूर करने के लिए कद्दू फोड़ना।', 'सुंडल, पोरी और मिठाई का भोग।'] },
    faqs: { en: [['Can Ayudha Puja and Vijayadashami be on the same day?', 'Yes. If Navami ends in the morning, Navami at sunrise and Dashami in the afternoon can fall on the same date, as in 2026 and 2027.']], hi: [['क्या आयुध पूजा और विजयादशमी एक ही दिन हो सकती हैं?', 'हाँ। अगर नवमी सुबह खत्म हो, तो सूर्योदय की नवमी और दोपहर की दशमी एक ही तारीख को पड़ सकती हैं, जैसे 2026 और 2027 में।']] },
  });

  add({
    slug: 'dussehra', type: 'hindu', month: 6, tithi: 10, rule: 'aparahna', key: 'tithi', skin: 'diwali', priority: 2,
    name: { en: 'Vijayadashami (Dussehra)', hi: 'विजयादशमी (दशहरा)' },
    alt: { en: 'Mysuru Dasara · Vidyarambham', hi: 'मैसूर दशहरा · विद्यारंभम' },
    lunar: { en: 'Ashvin Shukla Dashami · All India', hi: 'आश्विन शुक्ल दशमी · पूरा भारत' },
    intro: {
      en: 'Vijayadashami marks the victory of good over evil, of Rama over Ravana and of Goddess Durga over Mahishasura. It is the day when Dashami prevails in the afternoon (aparahna). Mysuru celebrates with the Jamboo Savari procession, and in Kerala and Tamil Nadu children begin learning letters (Vidyarambham).',
      hi: 'विजयादशमी बुराई पर अच्छाई की जीत का दिन है, रावण पर राम की और महिषासुर पर देवी दुर्गा की। यह वह दिन है जब दोपहर (अपराह्न) में दशमी हो। मैसूर में जंबू सवारी शोभायात्रा निकलती है, और केरल व तमिलनाडु में बच्चे अक्षर सीखना शुरू करते हैं (विद्यारंभम)।',
    },
    rituals: { en: ['Ravana dahan in the evening (North India).', 'Jamboo Savari procession in Mysuru.', 'Vidyarambham: children write their first letters in rice.'], hi: ['शाम को रावण दहन (उत्तर भारत)।', 'मैसूर में जंबू सवारी।', 'विद्यारंभम: बच्चे चावल पर पहले अक्षर लिखते हैं।'] },
    faqs: { en: [['What is Vidyarambham?', 'A Vijayadashami ritual in Kerala and Tamil Nadu where young children are initiated into learning by writing their first letters.']], hi: [['विद्यारंभम क्या है?', 'केरल और तमिलनाडु में विजयादशमी की एक रस्म, जिसमें छोटे बच्चे पहली बार अक्षर लिखकर पढ़ाई शुरू करते हैं।']] },
  });

  add({
    slug: 'naraka-chaturdashi', states: ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Puducherry'], type: 'hindu', month: 6, tithi: 29, rule: 'sunrise', key: 'tithi', skin: 'diwali', priority: 2, city: 'chennai',
    name: { en: 'Deepavali (Naraka Chaturdashi)', hi: 'दीपावली (नरक चतुर्दशी)' },
    alt: { en: 'South Indian Deepavali · Choti Diwali', hi: 'दक्षिण भारतीय दीपावली · छोटी दिवाली' },
    lunar: { en: 'Ashvin Krishna Chaturdashi (Amanta) · Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana', hi: 'आश्विन कृष्ण चतुर्दशी (अमांत) · तमिलनाडु, कर्नाटक, केरल, आंध्र प्रदेश, तेलंगाना' },
    intro: {
      en: 'In South India, Deepavali is celebrated on Naraka Chaturdashi, the day Lord Krishna defeated the demon Narakasura. The day starts before dawn with an oil bath (Ganga snanam), new clothes and crackers, while it is still Chaturdashi at sunrise. North India\'s Lakshmi Puja is on the following Amavasya, usually the next day.',
      hi: 'दक्षिण भारत में दीपावली नरक चतुर्दशी को मनाई जाती है, जिस दिन भगवान कृष्ण ने नरकासुर का वध किया था। दिन भोर से पहले तेल स्नान (गंगा स्नानम), नए कपड़ों और पटाखों से शुरू होता है, जब सूर्योदय पर चतुर्दशी हो। उत्तर भारत की लक्ष्मी पूजा अगली अमावस्या को, आमतौर पर अगले दिन, होती है।',
    },
    rituals: { en: ['Pre-dawn oil bath with gingelly oil and shikakai.', 'New clothes, crackers and Deepavali legiyam (a digestive).', 'Sweets and visits to family; in Karnataka, Bali Padyami follows.'], hi: ['भोर से पहले तिल के तेल और शिकाकाई से स्नान।', 'नए कपड़े, पटाखे और दीपावली लेहियम (पाचक)।', 'मिठाइयाँ और परिवार से मिलना; कर्नाटक में बाद में बलि पाड्यमी।'] },
    faqs: { en: [['Why is South Indian Deepavali a day before North Indian Diwali?', 'South India celebrates the morning of Naraka Chaturdashi, while North India\'s Lakshmi Puja is on the evening of Amavasya. In some years both fall on the same date.']], hi: [['दक्षिण भारतीय दीपावली उत्तर भारतीय दिवाली से एक दिन पहले क्यों होती है?', 'दक्षिण भारत नरक चतुर्दशी की सुबह मनाता है, जबकि उत्तर भारत की लक्ष्मी पूजा अमावस्या की शाम होती है। कुछ सालों में दोनों एक ही तारीख को पड़ते हैं।']] },
  });

  add({
    slug: 'subrahmanya-shashti', states: ['Karnataka', 'Andhra Pradesh', 'Telangana'], type: 'hindu', month: 8, tithi: 6, rule: 'sunrise', key: 'tithi', skin: 'murugan', priority: 3, city: 'bengaluru',
    name: { en: 'Subrahmanya Shashti', hi: 'सुब्रह्मण्य षष्ठी' },
    alt: { en: 'Kukke Subrahmanya Champa Shashti', hi: 'कुक्के सुब्रह्मण्य चंपा षष्ठी' },
    lunar: { en: 'Margashirsha Shukla Shashthi · Karnataka, Andhra Pradesh, Telangana', hi: 'मार्गशीर्ष शुक्ल षष्ठी · कर्नाटक, आंध्र प्रदेश, तेलंगाना' },
    intro: {
      en: 'Subrahmanya Shashti honours Lord Subrahmanya (Murugan, Kartikeya), worshipped in his serpent form in Karnataka. The biggest celebration is the chariot festival at Kukke Subrahmanya, and devotees offer prayers at snake shrines (naga bana) for health and family.',
      hi: 'सुब्रह्मण्य षष्ठी भगवान सुब्रह्मण्य (मुरुगन, कार्तिकेय) को समर्पित है, जिनकी कर्नाटक में नाग रूप में पूजा होती है। सबसे बड़ा उत्सव कुक्के सुब्रह्मण्य का रथोत्सव है, और भक्त स्वास्थ्य और परिवार के लिए नाग बन (नाग स्थलों) पर पूजा करते हैं।',
    },
    rituals: { en: ['Rathotsava (chariot festival) at Kukke Subrahmanya.', 'Offerings of milk at naga shrines; fasting.'], hi: ['कुक्के सुब्रह्मण्य में रथोत्सव।', 'नाग स्थलों पर दूध का अर्पण; व्रत।'] },
    faqs: { en: [['How is this different from Skanda Sashti?', 'Skanda Sashti (Soora Samharam) is a month earlier in Aippasi/Kartika and is the main Tamil festival; Subrahmanya Shashti in Margashirsha is especially important in Karnataka.']], hi: [['यह स्कंद षष्ठी से कैसे अलग है?', 'स्कंद षष्ठी (सूर सम्हारम) एक महीने पहले ऐप्पसि/कार्तिक में होती है और मुख्य तमिल पर्व है; मार्गशीर्ष की सुब्रह्मण्य षष्ठी कर्नाटक में विशेष महत्व रखती है।']] },
  });
};

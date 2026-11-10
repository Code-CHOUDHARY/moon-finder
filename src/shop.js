// Festival shopping suggestions, linked as Amazon.in searches with your Associates tag.
// Shown only when `amazonTag` is set in site.config.json (or AMAZON_TAG). Each item: [English label, Hindi label, search words].
'use strict';
const SHOP = {
  'karva-chauth': [['Karva Chauth puja thali set', 'करवा चौथ पूजा थाली सेट', 'karva chauth puja thali set'], ['Decorated chalni (sieve)', 'सजी हुई छलनी', 'karva chauth chalni'], ['Mehndi cones', 'मेहंदी कोन', 'natural mehndi cone'], ['Karva (kalash) set', 'करवा सेट', 'karva chauth karwa lota']],
  'sankashti-chaturthi': [['Ganesh idol for home', 'घर के लिए गणेश प्रतिमा', 'ganesh idol for home puja'], ['Modak mould', 'मोदक साँचा', 'modak mould'], ['Durva and puja samagri kit', 'पूजा सामग्री किट', 'ganesh puja samagri kit']],
  'ganesh-chaturthi': [['Eco-friendly Ganesh idol', 'इको-फ्रेंडली गणेश प्रतिमा', 'eco friendly clay ganesh idol'], ['Ganesh decoration items', 'गणेश सजावट सामान', 'ganpati decoration items'], ['Modak mould', 'मोदक साँचा', 'modak mould']],
  'sharad-purnima': [['Silver-plated kheer bowl', 'खीर के लिए चाँदी की कटोरी', 'silver plated bowl'], ['Lakshmi puja kit', 'लक्ष्मी पूजा किट', 'lakshmi puja samagri kit']],
  'ahoi-ashtami': [['Ahoi Mata puja set', 'अहोई माता पूजा सेट', 'ahoi ashtami puja'], ['Puja thali', 'पूजा थाली', 'puja thali set']],
  'diwali': [['Clay diyas', 'मिट्टी के दीये', 'clay diya set diwali'], ['Rangoli colours', 'रंगोली के रंग', 'rangoli colours'], ['Lakshmi Ganesh idol', 'लक्ष्मी गणेश प्रतिमा', 'lakshmi ganesh idol'], ['Decorative lights', 'सजावटी लाइट', 'diwali decoration lights']],
  'holi': [['Herbal gulal', 'हर्बल गुलाल', 'herbal gulal holi'], ['Pichkari', 'पिचकारी', 'holi pichkari'], ['Skin and hair protection oil', 'त्वचा और बालों का तेल', 'holi skin protection']],
  'raksha-bandhan': [['Rakhi sets', 'राखी सेट', 'rakhi set'], ['Rakhi gift hampers', 'राखी गिफ्ट हैम्पर', 'rakhi gift hamper']],
  'kartik-purnima': [['Clay diyas', 'मिट्टी के दीये', 'clay diya set'], ['Floating diyas', 'पानी में तैरने वाले दीये', 'floating diya']],
  'kajari-teej': [['Mehndi cones', 'मेहंदी कोन', 'natural mehndi cone'], ['Green glass bangles', 'हरी चूड़ियाँ', 'green glass bangles']],
  'hariyali-teej': [['Green glass bangles', 'हरी चूड़ियाँ', 'green glass bangles'], ['Mehndi cones', 'मेहंदी कोन', 'natural mehndi cone']],
  'hartalika-teej': [['Shiva Parvati puja kit', 'शिव पार्वती पूजा किट', 'hartalika teej puja samagri'], ['Mehndi cones', 'मेहंदी कोन', 'natural mehndi cone']],
  'purnima': [['Satyanarayan puja kit', 'सत्यनारायण पूजा किट', 'satyanarayan puja samagri kit'], ['Brass puja thali', 'पीतल की पूजा थाली', 'brass puja thali']],
  'eid-al-fitr': [['Attar (perfume oil)', 'इत्र', 'attar perfume'], ['Prayer mat', 'जानमाज़', 'prayer mat janamaz'], ['Eidi envelopes', 'ईदी लिफ़ाफ़े', 'eid envelopes']],
  'ramadan': [['Premium dates', 'खजूर', 'premium dates khajur'], ['Prayer mat', 'जानमाज़', 'prayer mat janamaz'], ['Quran stand (rehal)', 'रेहल', 'quran stand rehal']],
  'eid-al-adha': [['Attar (perfume oil)', 'इत्र', 'attar perfume'], ['Prayer mat', 'जानमाज़', 'prayer mat janamaz']],
  'chandra-grahan': [['Binoculars for sky watching', 'आसमान देखने के लिए दूरबीन', 'binoculars for astronomy'], ['Beginner telescope', 'शुरुआती टेलीस्कोप', 'beginner telescope']],
  'chandra-darshan': [['Binoculars for sky watching', 'आसमान देखने के लिए दूरबीन', 'binoculars for astronomy']],
};
const shopUrl = (q, tag) => `https://www.amazon.in/s?k=${encodeURIComponent(q)}&tag=${encodeURIComponent(tag)}`;
module.exports = { SHOP, shopUrl };

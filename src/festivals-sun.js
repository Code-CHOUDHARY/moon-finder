// Festivals decided by the Sun (English + Hindi): Chhath Puja, Lohri, Vaisakhi and the Bengali, Odia and Assamese
// new-year days. Added to the list by festivals.js.
// key 'chhath': sunset on the tithi day (Sandhya Arghya) and the next sunrise (Usha Arghya).
// type 'sankranti' with key 'sankranti': the Sun enters sidereal sign `sign`; style is the regional day-1 rule
// (see astro.solarMonthStart) and offset shifts the day (Lohri = eve of Makar Sankranti by the 'tamil' rule).
'use strict';

module.exports = function addSun(add) {
  add({
    slug: 'chhath-puja', states: ['Bihar', 'Jharkhand', 'Uttar Pradesh', 'Delhi', 'West Bengal', 'Chhattisgarh'], type: 'hindu', month: 7, tithi: 6, rule: 'sunset', key: 'chhath', skin: 'ganesh', priority: 1, city: 'patna',
    name: { en: 'Chhath Puja', hi: 'छठ पूजा' },
    alt: { en: 'Surya Shashthi · Dala Chhath · Chhathi Maiya', hi: 'सूर्य षष्ठी · डाला छठ · छठी मैया' },
    lunar: { en: 'Kartika Shukla Shashthi · Bihar, Jharkhand, eastern Uttar Pradesh', hi: 'कार्तिक शुक्ल षष्ठी · बिहार, झारखंड, पूर्वी उत्तर प्रदेश' },
    intro: {
      en: 'Chhath Puja is a four-day festival of the Sun god (Surya) and Chhathi Maiya, observed six days after Diwali on Kartika Shukla Shashthi. Devotees stand in a river or pond and offer arghya to the setting Sun on the main evening and to the rising Sun the next morning, after a fast of about 36 hours without water.',
      hi: 'छठ पूजा सूर्य देव और छठी मैया का चार दिन का पर्व है, जो दिवाली के छह दिन बाद कार्तिक शुक्ल षष्ठी को मनाया जाता है। व्रती नदी या तालाब में खड़े होकर मुख्य शाम को डूबते सूर्य को और अगली सुबह उगते सूर्य को अर्घ्य देते हैं, लगभग 36 घंटे के निर्जला व्रत के बाद।',
    },
    rituals: {
      en: ['Day 1, Nahay Khay: a bath in the river and one simple meal of rice, chana dal and bottle gourd.', 'Day 2, Kharna: a day-long fast broken after sunset with kheer made with jaggery, and roti. The 36-hour waterless fast begins after this meal.', 'Day 3, Sandhya Arghya: offerings of thekua, fruit and sugarcane in bamboo baskets (soop) to the setting Sun, standing in water.', 'Day 4, Usha Arghya: offerings to the rising Sun, after which the fast is broken with prasad.'],
      hi: ['पहला दिन, नहाय खाय: नदी में स्नान और चावल, चना दाल व लौकी का सादा भोजन।', 'दूसरा दिन, खरना: दिन भर का व्रत सूर्यास्त के बाद गुड़ की खीर और रोटी से खोला जाता है। इसी भोजन के बाद 36 घंटे का निर्जला व्रत शुरू होता है।', 'तीसरा दिन, संध्या अर्घ्य: पानी में खड़े होकर बाँस के सूप में ठेकुआ, फल और गन्ना डूबते सूर्य को अर्पित किया जाता है।', 'चौथा दिन, उषा अर्घ्य: उगते सूर्य को अर्घ्य देकर प्रसाद से व्रत खोला जाता है।'],
    },
    faqs: {
      en: [['When is the Chhath Puja evening arghya given?', 'At sunset on Kartika Shukla Shashthi. The exact sunset time for your city is shown above, and the morning arghya is offered at the next sunrise.'], ['Why is the Sun worshipped on Chhath?', 'Chhath thanks the Sun for sustaining life and asks for the health and well-being of the family. Both the setting and the rising Sun are worshipped, which is rare among Hindu festivals.'], ['What is Nahay Khay?', 'It is the first day of Chhath, two days before the evening arghya. Devotees bathe and eat one simple satvik meal before the fast begins.']],
      hi: [['छठ पूजा का संध्या अर्घ्य कब दिया जाता है?', 'कार्तिक शुक्ल षष्ठी के सूर्यास्त पर। आपके शहर का सूर्यास्त का सही समय ऊपर दिया है, और उषा अर्घ्य अगले सूर्योदय पर दिया जाता है।'], ['छठ पर सूर्य की पूजा क्यों होती है?', 'छठ में जीवन देने वाले सूर्य को धन्यवाद दिया जाता है और परिवार के स्वास्थ्य व सुख की कामना की जाती है। डूबते और उगते, दोनों सूर्य की पूजा होती है, जो हिंदू पर्वों में दुर्लभ है।'], ['नहाय खाय क्या है?', 'यह छठ का पहला दिन है, संध्या अर्घ्य से दो दिन पहले। व्रती स्नान करके व्रत शुरू होने से पहले एक सादा सात्विक भोजन करते हैं।']],
    },
  });

  add({
    slug: 'lohri', states: ['Punjab', 'Haryana', 'Delhi', 'Himachal Pradesh', 'Chandigarh', 'Jammu and Kashmir'], type: 'sankranti', sign: 9, style: 'tamil', offset: -1, key: 'bonfire', skin: 'diwali', priority: 2, city: 'amritsar',
    name: { en: 'Lohri', hi: 'लोहड़ी' },
    alt: { en: 'Lohri bonfire · Eve of Makar Sankranti', hi: 'लोहड़ी की आग · मकर संक्रांति की पूर्व संध्या' },
    lunar: { en: 'The evening before the Sun enters sidereal Makara (Capricorn) · Punjab and North India', hi: 'सूर्य के निरयण मकर राशि में प्रवेश से पहले की शाम · पंजाब और उत्तर भारत' },
    intro: {
      en: 'Lohri is the Punjabi winter bonfire festival, held on the evening before Makar Sankranti, when the Sun enters Makara (Capricorn). It marks the end of the coldest weeks and the rabi harvest to come. Families light a bonfire after sunset, circle it, and offer sesame, jaggery, peanuts and popcorn to the fire.',
      hi: 'लोहड़ी पंजाब का शीतकालीन अलाव पर्व है, जो मकर संक्रांति से पहले की शाम को मनाया जाता है, जब सूर्य मकर राशि में प्रवेश करता है। यह सबसे ठंडे दिनों के अंत और आने वाली रबी की फ़सल का प्रतीक है। परिवार सूर्यास्त के बाद अलाव जलाते हैं, उसकी परिक्रमा करते हैं और आग में तिल, गुड़, मूँगफली और मक्का अर्पित करते हैं।',
    },
    rituals: {
      en: ['A bonfire is lit after sunset and the family walks around it.', 'Til (sesame), gur (jaggery), rewri, peanuts and popcorn are offered to the fire and shared.', 'Folk songs about Dulla Bhatti are sung, with bhangra and giddha.', 'A first Lohri after a wedding or a birth is celebrated with extra festivity.'],
      hi: ['सूर्यास्त के बाद अलाव जलाया जाता है और परिवार उसकी परिक्रमा करता है।', 'तिल, गुड़, रेवड़ी, मूँगफली और मक्का आग में अर्पित करके बाँटे जाते हैं।', 'दुल्ला भट्टी के लोकगीत गाए जाते हैं, भांगड़ा और गिद्दा के साथ।', 'शादी या बच्चे के जन्म के बाद की पहली लोहड़ी विशेष धूमधाम से मनाई जाती है।'],
    },
    faqs: {
      en: [['When is the Lohri bonfire lit?', 'After sunset on the evening before Makar Sankranti. The sunset time for your city is shown above.'], ['Why is Lohri celebrated on 13 or 14 January?', 'Lohri is the evening before the Sun enters Makara (Capricorn). That moment shifts by a few hours each year, so Makar Sankranti falls on 14 or 15 January and Lohri on the day before.'], ['What is offered to the Lohri fire?', 'Sesame seeds (til), jaggery (gur), rewri, peanuts and popcorn are offered to the fire and then shared as prasad.']],
      hi: [['लोहड़ी की आग कब जलाई जाती है?', 'मकर संक्रांति से पहले की शाम सूर्यास्त के बाद। आपके शहर का सूर्यास्त का समय ऊपर दिया है।'], ['लोहड़ी 13 या 14 जनवरी को क्यों होती है?', 'लोहड़ी सूर्य के मकर राशि में प्रवेश से पहले की शाम है। यह क्षण हर साल कुछ घंटे खिसकता है, इसलिए मकर संक्रांति 14 या 15 जनवरी को और लोहड़ी उससे एक दिन पहले पड़ती है।'], ['लोहड़ी की आग में क्या अर्पित किया जाता है?', 'तिल, गुड़, रेवड़ी, मूँगफली और मक्का आग में अर्पित करके प्रसाद के रूप में बाँटे जाते हैं।']],
    },
  });

  add({
    slug: 'vaisakhi', states: ['Punjab', 'Haryana', 'Delhi', 'Himachal Pradesh', 'Chandigarh', 'Jammu and Kashmir'], type: 'sankranti', sign: 0, style: 'same', offset: 0, key: 'sankranti', skin: 'holi', priority: 2, city: 'amritsar',
    name: { en: 'Vaisakhi (Baisakhi)', hi: 'वैसाखी (बैसाखी)' },
    alt: { en: 'Mesha Sankranti · Punjabi harvest festival · Khalsa Sajna Divas', hi: 'मेष संक्रांति · पंजाब का फ़सल पर्व · खालसा साजना दिवस' },
    lunar: { en: 'The day the Sun enters sidereal Mesha (Aries) · Punjab and North India', hi: 'सूर्य का निरयण मेष राशि में प्रवेश · पंजाब और उत्तर भारत' },
    intro: {
      en: 'Vaisakhi is the harvest festival of Punjab and the solar new year in much of North India, held on the day the Sun enters Mesha (Aries). For Sikhs it also marks the founding of the Khalsa in 1699. It falls on 13 or 14 April.',
      hi: 'वैसाखी पंजाब का फ़सल पर्व और उत्तर भारत के बड़े हिस्से में सौर नव वर्ष है, जो सूर्य के मेष राशि में प्रवेश के दिन मनाया जाता है। सिखों के लिए यह 1699 में खालसा की स्थापना का दिन भी है। यह 13 या 14 अप्रैल को पड़ती है।',
    },
    rituals: {
      en: ['Gurdwaras hold kirtan, nagar kirtan processions and langar.', 'Farmers celebrate the wheat harvest with bhangra and giddha.', 'Many take a dip in a river or sarovar in the morning.', 'It is a day for new beginnings and new account books in some communities.'],
      hi: ['गुरुद्वारों में कीर्तन, नगर कीर्तन और लंगर होते हैं।', 'किसान गेहूँ की फ़सल का उत्सव भांगड़ा और गिद्दा के साथ मनाते हैं।', 'कई लोग सुबह नदी या सरोवर में स्नान करते हैं।', 'कुछ समुदायों में यह नई शुरुआत और नए बही-खातों का दिन है।'],
    },
    faqs: {
      en: [['When is Vaisakhi?', 'On the day the Sun enters sidereal Mesha (Aries), which is 13 or 14 April. The exact time of the sankranti is shown above.'], ['Why does Vaisakhi move between 13 and 14 April?', 'The Sun\'s entry into Mesha shifts by a few hours each year. Under the rule used here, the day counts if the entry is before sunset in Delhi.'], ['Is Vaisakhi the same as the Hindu solar new year?', 'Yes. Mesha Sankranti starts the solar year, and the same event is Puthandu in Tamil Nadu, Vishu in Kerala, Pana Sankranti in Odisha, Poila Boishakh in Bengal and Bohag Bihu in Assam.']],
      hi: [['वैसाखी कब है?', 'जिस दिन सूर्य निरयण मेष राशि में प्रवेश करता है, यानी 13 या 14 अप्रैल। संक्रांति का सही समय ऊपर दिया है।'], ['वैसाखी 13 और 14 अप्रैल के बीच क्यों बदलती है?', 'सूर्य का मेष राशि में प्रवेश हर साल कुछ घंटे खिसकता है। यहाँ के नियम के अनुसार, प्रवेश दिल्ली में सूर्यास्त से पहले हो तो वही दिन गिना जाता है।'], ['क्या वैसाखी और हिंदू सौर नव वर्ष एक ही हैं?', 'हाँ। मेष संक्रांति से सौर वर्ष शुरू होता है; यही घटना तमिलनाडु में पुत्तांडु, केरल में विशु, ओडिशा में पणा संक्रांति, बंगाल में पोइला बैशाख और असम में बोहाग बिहू है।']],
    },
  });

  add({
    slug: 'poila-boishakh', states: ['West Bengal', 'Tripura'], type: 'sankranti', sign: 0, style: 'next', offset: 0, key: 'sankranti', skin: 'purnima', priority: 3, city: 'kolkata',
    name: { en: 'Poila Boishakh (Bengali New Year)', hi: 'पोइला बैशाख (बंगाली नव वर्ष)' },
    alt: { en: 'Pohela Boishakh · Noboborsho · Boishakh 1', hi: 'पहेला बैशाख · नववर्ष · बैशाख 1' },
    lunar: { en: 'The day after the Sun enters sidereal Mesha (Aries) · West Bengal and Tripura', hi: 'सूर्य के निरयण मेष राशि में प्रवेश का अगला दिन · पश्चिम बंगाल और त्रिपुरा' },
    intro: {
      en: 'Poila Boishakh is the Bengali New Year, the first day of the month Boishakh in the traditional Bengali calendar followed in West Bengal. It falls on 14 or 15 April. The Bangladeshi national calendar fixes it on 14 April.',
      hi: 'पोइला बैशाख बंगाली नव वर्ष है, पश्चिम बंगाल के पारंपरिक बंगाली कैलेंडर में बैशाख मास का पहला दिन। यह 14 या 15 अप्रैल को पड़ता है। बांग्लादेश का राष्ट्रीय कैलेंडर इसे 14 अप्रैल पर स्थिर रखता है।',
    },
    rituals: {
      en: ['Traders open new account books (haal khata) and offer sweets to customers.', 'Homes are decorated with alpona and families wear new clothes.', 'Processions and cultural programmes are held in the morning.', 'Many visit Kalighat, Dakshineswar and other temples.'],
      hi: ['व्यापारी नए बही-खाते (हाल खाता) खोलते हैं और ग्राहकों को मिठाई देते हैं।', 'घरों को अल्पना से सजाया जाता है और परिवार नए कपड़े पहनते हैं।', 'सुबह शोभायात्राएँ और सांस्कृतिक कार्यक्रम होते हैं।', 'कई लोग कालीघाट, दक्षिणेश्वर और अन्य मंदिरों में जाते हैं।'],
    },
    faqs: {
      en: [['When is Poila Boishakh?', 'On the day after the Sun enters sidereal Mesha (Aries), which is 14 or 15 April in West Bengal. The exact time of the sankranti is shown above.'], ['Why is the Bangladeshi date sometimes different?', 'Bangladesh uses a revised national calendar that fixes Pohela Boishakh on 14 April every year. West Bengal follows the traditional sankranti rule, so it can be a day later.'], ['Is Poila Boishakh the same day as Vaisakhi and Vishu?', 'It marks the same solar event. Regional rules for the day differ slightly, so Vaisakhi, Vishu, Puthandu, Pana Sankranti, Poila Boishakh and Bohag Bihu fall within a day of each other.']],
      hi: [['पोइला बैशाख कब है?', 'जिस दिन सूर्य निरयण मेष राशि में प्रवेश करता है उसके अगले दिन, यानी पश्चिम बंगाल में 14 या 15 अप्रैल। संक्रांति का सही समय ऊपर दिया है।'], ['बांग्लादेश की तारीख कभी-कभी अलग क्यों होती है?', 'बांग्लादेश का संशोधित राष्ट्रीय कैलेंडर पहेला बैशाख को हर साल 14 अप्रैल पर स्थिर रखता है। पश्चिम बंगाल पारंपरिक संक्रांति नियम मानता है, इसलिए यह एक दिन बाद हो सकता है।'], ['क्या पोइला बैशाख, वैसाखी और विशु एक ही दिन होते हैं?', 'ये एक ही सौर घटना से जुड़े हैं। दिन तय करने के क्षेत्रीय नियम थोड़े अलग हैं, इसलिए वैसाखी, विशु, पुत्तांडु, पणा संक्रांति, पोइला बैशाख और बोहाग बिहू एक-दूसरे के एक दिन के भीतर पड़ते हैं।']],
    },
  });

  add({
    slug: 'pana-sankranti', states: ['Odisha'], type: 'sankranti', sign: 0, style: 'same', offset: 0, key: 'sankranti', skin: 'purnima', priority: 3, city: 'bhubaneswar',
    name: { en: 'Pana Sankranti (Odia New Year)', hi: 'पणा संक्रांति (ओड़िया नव वर्ष)' },
    alt: { en: 'Maha Bishuba Sankranti · Odia Nababarsha', hi: 'महा विषुव संक्रांति · ओड़िया नववर्ष' },
    lunar: { en: 'The day the Sun enters sidereal Mesha (Aries) · Odisha', hi: 'सूर्य के निरयण मेष राशि में प्रवेश का दिन · ओडिशा' },
    intro: {
      en: 'Pana Sankranti, also called Maha Bishuba Sankranti, is the Odia New Year. It is observed on the day the Sun enters Mesha (Aries) and falls on 14 or 15 April. It is named after pana, a sweet drink of bel fruit, jaggery and curd that is offered and shared on the day.',
      hi: 'पणा संक्रांति, जिसे महा विषुव संक्रांति भी कहते हैं, ओड़िया नव वर्ष है। यह सूर्य के मेष राशि में प्रवेश के दिन मनाई जाती है और 14 या 15 अप्रैल को पड़ती है। इसका नाम पणा से आया है, जो बेल, गुड़ और दही का मीठा पेय है और इस दिन अर्पित करके बाँटा जाता है।',
    },
    rituals: {
      en: ['Pana, a sweet drink, is prepared and offered to deities and shared with neighbours.', 'A pot with a small hole is hung over the tulsi plant so that water drips on it through the hot month.', 'People visit Hanuman, Shiva and Devi temples.', 'The new Odia panjika (almanac) comes into use from this day.'],
      hi: ['पणा नामक मीठा पेय बनाकर देवताओं को अर्पित किया जाता है और पड़ोसियों में बाँटा जाता है।', 'तुलसी के पौधे के ऊपर छोटे छेद वाला घड़ा टाँगा जाता है ताकि गर्म महीने भर उस पर पानी टपकता रहे।', 'लोग हनुमान, शिव और देवी मंदिरों में जाते हैं।', 'इस दिन से नया ओड़िया पंजिका (पंचांग) लागू होता है।'],
    },
    faqs: {
      en: [['When is Pana Sankranti?', 'On the day the Sun enters sidereal Mesha (Aries), which is 14 or 15 April. The exact time of the sankranti is shown above.'], ['Why is it called Pana Sankranti?', 'After pana, a sweet drink made from bel fruit, jaggery and curd, which is offered to deities and shared on this day.'], ['Is Pana Sankranti the same day as Vaisakhi and Poila Boishakh?', 'It marks the same solar event. Under the Odisha rule the day of the sankranti itself is the first day, so it falls with Vaisakhi and Puthandu and can be a day earlier than Poila Boishakh and Bohag Bihu.']],
      hi: [['पणा संक्रांति कब है?', 'जिस दिन सूर्य निरयण मेष राशि में प्रवेश करता है, यानी 14 या 15 अप्रैल। संक्रांति का सही समय ऊपर दिया है।'], ['इसे पणा संक्रांति क्यों कहते हैं?', 'पणा के नाम पर, जो बेल, गुड़ और दही से बना मीठा पेय है और इस दिन देवताओं को अर्पित करके बाँटा जाता है।'], ['क्या पणा संक्रांति, वैसाखी और पोइला बैशाख एक ही दिन होते हैं?', 'ये एक ही सौर घटना से जुड़े हैं। ओडिशा के नियम में संक्रांति का दिन ही पहला दिन है, इसलिए यह वैसाखी और पुत्तांडु के साथ पड़ती है और पोइला बैशाख व बोहाग बिहू से एक दिन पहले हो सकती है।']],
    },
  });

  add({
    slug: 'bohag-bihu', states: ['Assam'], type: 'sankranti', sign: 0, style: 'next', offset: 0, key: 'sankranti', skin: 'leaf', priority: 3, city: 'guwahati',
    name: { en: 'Bohag Bihu (Assamese New Year)', hi: 'बोहाग बिहू (असमिया नव वर्ष)' },
    alt: { en: 'Rongali Bihu · Bohag 1', hi: 'रोंगाली बिहू · बोहाग 1' },
    lunar: { en: 'The day after the Sun enters sidereal Mesha (Aries) · Assam', hi: 'सूर्य के निरयण मेष राशि में प्रवेश का अगला दिन · असम' },
    intro: {
      en: 'Bohag Bihu, or Rongali Bihu, is the Assamese New Year and spring festival. Its main day is the first day of the month Bohag, the day after the Sun enters Mesha (Aries), and falls on 14 or 15 April. The day before the main day, Goru Bihu, is for bathing and honouring cattle.',
      hi: 'बोहाग बिहू, या रोंगाली बिहू, असमिया नव वर्ष और वसंत का पर्व है। इसका मुख्य दिन बोहाग मास का पहला दिन है, यानी सूर्य के मेष राशि में प्रवेश का अगला दिन, जो 14 या 15 अप्रैल को पड़ता है। मुख्य दिन से एक दिन पहले गोरू बिहू होता है, जब मवेशियों को नहलाकर उनकी पूजा की जाती है।',
    },
    rituals: {
      en: ['On Goru Bihu, the day before, cattle are bathed, smeared with turmeric and given new ropes.', 'On the main day (Manuh Bihu) people wear new clothes and seek blessings from elders.', 'Bihu dance and songs with the dhol, pepa and gogona are performed.', 'Pitha, laru and other rice-based sweets are prepared and shared.'],
      hi: ['एक दिन पहले गोरू बिहू पर मवेशियों को नहलाकर हल्दी लगाई जाती है और नई रस्सियाँ दी जाती हैं।', 'मुख्य दिन (मानुह बिहू) लोग नए कपड़े पहनते हैं और बड़ों का आशीर्वाद लेते हैं।', 'ढोल, पेपा और गगना के साथ बिहू नृत्य और गीत होते हैं।', 'पीठा, लारू और चावल से बनी अन्य मिठाइयाँ बनाकर बाँटी जाती हैं।'],
    },
    faqs: {
      en: [['When is Bohag Bihu?', 'On the day after the Sun enters sidereal Mesha (Aries), which is 14 or 15 April. The exact time of the sankranti is shown above.'], ['What is Goru Bihu?', 'It is the day before the main day of Bohag Bihu, when cattle are bathed and honoured. It falls on the sankranti day itself.'], ['Is Bohag Bihu the same day as Poila Boishakh and Vaisakhi?', 'It marks the same solar event. Assam and West Bengal count the day after the sankranti as the first day, so Bohag Bihu falls with Poila Boishakh and can be a day later than Vaisakhi.']],
      hi: [['बोहाग बिहू कब है?', 'जिस दिन सूर्य निरयण मेष राशि में प्रवेश करता है उसके अगले दिन, यानी 14 या 15 अप्रैल। संक्रांति का सही समय ऊपर दिया है।'], ['गोरू बिहू क्या है?', 'यह बोहाग बिहू के मुख्य दिन से एक दिन पहले होता है, जब मवेशियों को नहलाकर उनकी पूजा की जाती है। यह संक्रांति के दिन ही पड़ता है।'], ['क्या बोहाग बिहू, पोइला बैशाख और वैसाखी एक ही दिन होते हैं?', 'ये एक ही सौर घटना से जुड़े हैं। असम और पश्चिम बंगाल में संक्रांति का अगला दिन पहला दिन माना जाता है, इसलिए बोहाग बिहू पोइला बैशाख के साथ पड़ता है और वैसाखी से एक दिन बाद हो सकता है।']],
    },
  });
};

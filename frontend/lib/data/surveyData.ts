import { SurveyData, QuestionData } from '@/types';
import { QUESTIONS } from './questions';

// Helper function to generate question data for a city with some variation
function generateQuestionData(cityId: string, questionId: number): QuestionData {
  const question = QUESTIONS.find(q => q.questionId === questionId)!;

  // Use cityId as seed for consistent but varied data
  const seed = cityId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seededRandom = (base: number, range: number) => {
    const hash = ((seed * questionId * 9301 + 49297) % 233280) / 233280;
    return base + Math.floor(hash * range) - Math.floor(range / 2);
  };

  const dataTemplates: Record<number, { labels: string[]; getValues: () => number[] }> = {
    1: {
      labels: ['Bridal/Marriage', 'Special Occasion', 'Personal Use'],
      getValues: () => {
        const v = seededRandom(0, 10);
        return [45 + v, 30 - Math.floor(v / 2), 25 - Math.ceil(v / 2)];
      }
    },
    2: {
      labels: ['22K Gold', '24K Gold', '18K Gold', 'Platinum'],
      getValues: () => {
        const v = seededRandom(0, 8);
        return [50 + v, 30 - v, 15, 5];
      }
    },
    3: {
      labels: ['Highly Influences', 'Moderately Influences', "Doesn't Influence Much"],
      getValues: () => {
        const v = seededRandom(0, 10);
        return [60 + v, 30 - Math.floor(v / 2), 10 - Math.ceil(v / 2)];
      }
    },
    4: {
      labels: ['Design', 'Price', 'Brand', 'Sustainability/Materials'],
      getValues: () => {
        const v = seededRandom(0, 8);
        return [45 + v, 35 - v, 15, 5];
      }
    },
    5: {
      labels: ['Quarterly', 'Semi-Annually', 'Annually'],
      getValues: () => {
        const v = seededRandom(0, 10);
        return [30 + v, 40, 30 - v];
      }
    },
    6: {
      labels: ['In-store', 'Online', 'Both'],
      getValues: () => {
        const v = seededRandom(0, 8);
        return [40 + v, 50 - v, 10];
      }
    },
    7: {
      labels: ['Instagram/Facebook', 'E-commerce Websites (Amazon, Flipkart)', 'Brand Websites (Tanishq, etc.)'],
      getValues: () => {
        const v = seededRandom(0, 10);
        return [55 + v, 30 - Math.floor(v / 2), 15 - Math.ceil(v / 2)];
      }
    },
    8: {
      labels: ['Stick to Known Brands', 'Open to New Brands'],
      getValues: () => {
        const v = seededRandom(0, 10);
        return [60 + v, 40 - v];
      }
    },
    9: {
      labels: ['Very Much', 'Somewhat', 'Not Much'],
      getValues: () => {
        const v = seededRandom(0, 10);
        return [50 + v, 35 - Math.floor(v / 2), 15 - Math.ceil(v / 2)];
      }
    },
    10: {
      labels: ['Special Occasions Only (Weddings, Anniversaries, etc.)', 'Quarterly', 'Semi-Annually', 'Annually'],
      getValues: () => {
        const v = seededRandom(0, 6);
        return [15 + v, 20 - Math.floor(v / 2), 40, 25 - Math.ceil(v / 2)];
      }
    },
    11: {
      labels: ['Very Important', 'Somewhat Important', 'Not Important at All'],
      getValues: () => {
        const v = seededRandom(0, 8);
        return [50 + v, 40 - Math.floor(v / 2), 10 - Math.ceil(v / 2)];
      }
    },
    12: {
      labels: ['Yes, always', 'Sometimes, depending on the occasion', 'No, I prefer standard designs'],
      getValues: () => {
        const v = seededRandom(0, 8);
        return [35 + v, 40 - Math.floor(v / 2), 25 - Math.ceil(v / 2)];
      }
    },
    13: {
      labels: ['Weddings', 'Anniversaries', 'Festivals (Diwali, Christmas, etc.)', 'Personal Milestones (e.g., promotion, achievement)'],
      getValues: () => {
        const v = seededRandom(0, 8);
        return [50 + v, 30 - Math.floor(v / 2), 10, 10 - Math.ceil(v / 2)];
      }
    },
    14: {
      labels: ['Very important', 'Somewhat important', 'Not important'],
      getValues: () => {
        const v = seededRandom(0, 8);
        return [55 + v, 35 - Math.floor(v / 2), 10 - Math.ceil(v / 2)];
      }
    },
  };

  const template = dataTemplates[questionId];
  const values = template.getValues();

  const keyTakeaways = generateKeyTakeaways(questionId, template.labels, values);
  const insights = generateInsights(questionId, template.labels, values);

  return {
    questionId,
    questionText: question.questionText,
    chartType: question.chartType,
    data: {
      labels: template.labels,
      values,
    },
    keyTakeaways,
    insights,
  };
}

function generateKeyTakeaways(questionId: number, labels: string[], values: number[]): string[] {
  const takeawayTemplates: Record<number, (labels: string[], values: number[]) => string[]> = {
    1: (l, v) => [
      `${l[0]} is the Primary Driver: ${v[0]}% of consumers purchase jewelry for bridal/marriage purposes, making it the leading motivation for high-value jewelry purchases.`,
      `Special Occasions Influence Purchases: ${v[1]}% of consumers buy jewelry for special occasions such as weddings, anniversaries, or festivals, indicating the importance of seasonal marketing and event-based campaigns.`,
      `Personal Use Accounts for a Quarter of Purchases: ${v[2]}% of consumers purchase jewelry for personal use, suggesting there is a market for premium self-gifting and personal milestone purchases.`,
    ],
    2: (l, v) => [
      `${l[0]} is the most preferred, with ${v[0]}% of consumers choosing it for its ideal balance of purity and value.`,
      `${l[1]}, the highest purity option, is chosen by ${v[1]}% of consumers, indicating a strong preference for premium jewelry.`,
      `${l[2]} appeals to ${v[2]}% of consumers, likely due to its durability and affordable pricing compared to higher purity options.`,
      `${l[3]} is less preferred, with only ${v[3]}% choosing it, which highlights its appeal for luxury buyers seeking exclusive, durable jewelry.`,
    ],
    3: (l, v) => [
      `Strong Influence (${v[0]}%): Brand reputation strongly impacts high-value jewelry purchases. Brands should highlight their heritage, quality, and reputation in marketing.`,
      `Moderate Influence (${v[1]}%): Brand reputation plays a role, though not the top priority. Strong product guarantees and customer service can help build trust.`,
      `Minimal Influence (${v[2]}%): Brand reputation has little impact. Focus on design, price, and product features for this segment, offering personalized experiences or competitive pricing.`,
    ],
    4: (l, v) => [
      `${l[0]} (${v[0]}%): The most important factor for special occasion jewelry. Brands should offer unique, stylish, and customized designs.`,
      `${l[1]} (${v[1]}%): A significant consideration for consumers, even for special events like weddings or anniversaries.`,
      `${l[2]} Reputation (${v[2]}%): Less influential for special occasion purchases, though still a factor.`,
      `${l[3]} (${v[3]}%): Minimal impact on decision-making, with eco-friendly options being secondary.`,
    ],
    5: (l, v) => [
      `Semi-Annual Purchases (${v[1]}%): Consumers buy jewelry twice a year. Brands should target this group with seasonal campaigns and exclusive offers during mid-year and year-end sales.`,
      `Quarterly Purchases (${v[0]}%): Consumers buy jewelry frequently. Limited edition collections and exclusive designs can appeal to this group and drive repeat sales.`,
      `Annual Purchases (${v[2]}%): Consumers buy jewelry for special occasions. Brands can target this group with yearly collections or anniversary specials.`,
    ],
    6: (l, v) => [
      `Online Shopping Preferred (${v[1]}%): Consumers prefer online shopping for its convenience and variety. Brands should enhance their online presence with a user-friendly website and features like virtual try-ons or 3D views.`,
      `In-store Shopping Popular (${v[0]}%): Many still prefer the in-store experience for tangible interaction. Brands should focus on premium in-store experiences with personalized service and product engagement.`,
      `Omnichannel Preference (${v[2]}%): Some consumers use both online and in-store channels. Brands should develop a seamless omnichannel strategy with online browsing and offline purchasing options like click-and-collect.`,
    ],
    7: (l, v) => [
      `${l[0]} Dominates (${v[0]}%): Consumers primarily use Instagram and Facebook for jewelry research and shopping. Brands should engage through high-quality images, influencer partnerships, and targeted ads to drive traffic and interest.`,
      `${l[1]} (${v[1]}%): Consumers also turn to platforms like Amazon and Flipkart for jewelry purchases. Listing on major e-commerce sites can expand reach and build trust with consumer reviews.`,
      `${l[2]} (${v[2]}%): A smaller segment relies on brand websites for research or shopping, indicating the continued relevance of brand loyalty and direct-to-consumer sales.`,
    ],
    8: (l, v) => [
      `Strong Preference for Well-known Brands (${v[0]}%): Consumers prioritize established brands due to reputation and trust. Maintaining brand strength is crucial for repeat purchases.`,
      `Openness to New Brands (${v[1]}%): Consumers are open to new brands, seeking unique designs, competitive pricing, or better service. This segment presents opportunities for innovation and differentiation.`,
    ],
    9: (l, v) => [
      `Strong Influence (${v[0]}%): Social media, especially Instagram and Facebook, heavily influences jewelry purchasing decisions. Brands should invest in targeted ads, organic posts, and influencer collaborations.`,
      `Moderate Impact (${v[1]}%): Social media somewhat impacts decisions, mainly through brand awareness and promotions. A broader marketing strategy with personalized offers should be used for this group.`,
      `Low Impact (${v[2]}%): Social media has little effect on decisions. This group values factors like brand reputation, price, and product features, so brands should focus on design, quality, and pricing for these consumers.`,
    ],
    10: (l, v) => [
      `${v[2]}% of consumers buy jewelry semi-annually, showing a preference for regular but not overly frequent purchases.`,
      `${v[3]}% purchase jewelry annually, indicating more occasional spending.`,
      `${v[1]}% purchase quarterly, and ${v[0]}% only for special occasions like weddings or anniversaries.`,
    ],
    11: (l, v) => [
      `${v[0]}% of consumers rate design as very important, making it the most influential factor in jewelry purchases.`,
      `${v[1]}% consider design to be somewhat important, reflecting that it plays a role but isn't the only factor.`,
      `${v[2]}% feel that design is not important in their decision-making process.`,
    ],
    12: (l, v) => [
      `${v[1]}% of consumers prefer customization sometimes, depending on the occasion, showing flexibility in their preferences.`,
      `${v[0]}% always prefer customized designs, especially for special occasions.`,
      `${v[2]}% prefer standard designs, indicating a market for both custom and traditional options.`,
    ],
    13: (l, v) => [
      `${v[0]}% of consumers purchase jewelry for weddings, making it the dominant occasion for high-value jewelry.`,
      `${v[1]}% purchase for anniversaries, highlighting the role of personal milestones.`,
      `${v[2]}% purchase for festivals, while another ${v[3]}% purchase for personal achievements like promotions.`,
    ],
    14: (l, v) => [
      `${v[0]}% of consumers consider certification very important, indicating a strong demand for authenticity and trust.`,
      `${v[1]}% find certification somewhat important, suggesting that it is a secondary consideration.`,
      `${v[2]}% do not see certification as a priority, pointing to a smaller segment that may focus more on design or price.`,
    ],
  };

  return takeawayTemplates[questionId](labels, values);
}

function generateInsights(questionId: number, labels: string[], values: number[]): string {
  const insightTemplates: Record<number, string> = {
    1: `The majority of high-value jewelry purchases are driven by bridal and marriage-related needs, accounting for ${values[0]}% of the market. This highlights the importance of targeting wedding seasons and offering specialized bridal collections. Special occasions and personal use also contribute significantly, indicating diverse consumer motivations.`,
    2: `Consumer preferences show a strong inclination towards ${labels[0]}, chosen by ${values[0]}% of respondents. This reflects the balance between purity and value that most consumers seek. The premium ${labels[1]} segment, while smaller at ${values[1]}%, represents an important luxury market segment.`,
    3: `Brand reputation plays a crucial role in high-value jewelry purchases, with ${values[0]}% of consumers indicating it highly influences their decisions. This underscores the importance of brand heritage, quality assurance, and reputation management in marketing strategies. Building and maintaining trust is essential for success in this market.`,
    4: `Design emerges as the dominant factor in special occasion jewelry selection, cited by ${values[0]}% of consumers. This emphasizes the need for unique, aesthetically appealing, and customizable designs. Price remains important at ${values[1]}%, suggesting that even for special occasions, value consideration is significant.`,
    5: `Consumer purchasing frequency is fairly distributed, with ${values[1]}% buying semi-annually. This pattern suggests opportunities for strategic seasonal campaigns, new collection launches timed with peak buying periods, and loyalty programs to encourage more frequent purchases.`,
    6: `The jewelry market shows a clear shift towards digital channels, with ${values[1]}% of consumers preferring online shopping. However, the ${values[0]}% who prefer in-store experiences indicate the continued importance of physical retail. A hybrid omnichannel approach appears optimal for reaching the broadest consumer base.`,
    7: `Social media platforms, particularly Instagram and Facebook, dominate as research and shopping tools, trusted by ${values[0]}% of consumers. This digital-first behavior requires brands to maintain strong social media presence, invest in influencer marketing, and create shareable, visually appealing content.`,
    8: `Consumer brand loyalty remains strong, with ${values[0]}% preferring established brands. However, the ${values[1]}% openness to new brands suggests opportunities for emerging players who can differentiate through unique designs, competitive pricing, or superior customer experience.`,
    9: `Social media significantly impacts jewelry purchasing decisions for ${values[0]}% of consumers. This digital influence requires brands to integrate social commerce strategies, leverage user-generated content, and maintain active engagement with their online communities to drive purchase decisions.`,
    10: `Purchase frequency analysis reveals that ${values[2]}% of consumers buy jewelry semi-annually, representing the largest segment. Annual buyers at ${values[3]}% and quarterly buyers at ${values[1]}% indicate varied purchasing patterns. The ${values[0]}% who buy only for special occasions suggest targeted event-based marketing can capture this segment effectively.`,
    11: `Design is the most critical factor in jewelry purchase decisions, with ${values[0]}% rating it as very important. Combined with the ${values[1]}% who find it somewhat important, design influences over ${values[0] + values[1]}% of all purchase decisions. Brands should prioritize innovative, aesthetically appealing designs and invest in design-led marketing to capture consumer attention.`,
    12: `Customization preferences show a mixed market: ${values[1]}% prefer customization sometimes depending on the occasion, while ${values[0]}% always want personalized options. The ${values[2]}% who prefer standard designs indicate that brands should offer both customizable and ready-made collections to cater to diverse preferences.`,
    13: `Weddings dominate jewelry purchase occasions at ${values[0]}%, confirming the bridal segment as the primary market driver. Anniversaries account for ${values[1]}%, while festivals and personal milestones contribute ${values[2]}% and ${values[3]}% respectively. Brands should align their collections and campaigns with these key occasions throughout the year.`,
    14: `Certification plays a significant role in purchase decisions, with ${values[0]}% of consumers considering it very important. This highlights the growing consumer awareness about authenticity and quality standards like BIS hallmark. Brands that prominently display certifications and educate consumers about quality standards can build stronger trust and competitive advantage.`,
  };

  return insightTemplates[questionId];
}

// Cities organized by weeks as specified
const cities = [
  // March - Week 1: Mumbai & Pune
  { id: 'mumbai-mar-w1', name: 'Mumbai', state: 'Maharashtra' },
  { id: 'pune-mar-w1', name: 'Pune', state: 'Maharashtra' },
  // March - Week 2: Ahmedabad & Surat
  { id: 'ahmedabad-mar-w2', name: 'Ahmedabad', state: 'Gujarat' },
  { id: 'surat-mar-w2', name: 'Surat', state: 'Gujarat' },
  // March - Week 3: Jaipur & Udaipur
  { id: 'jaipur-mar-w3', name: 'Jaipur', state: 'Rajasthan' },
  { id: 'udaipur-mar-w3', name: 'Udaipur', state: 'Rajasthan' },
  // March - Week 4: Bhubaneswar & Cuttack
  { id: 'bhubaneswar-mar-w4', name: 'Bhubaneswar', state: 'Odisha' },
  { id: 'cuttack-mar-w4', name: 'Cuttack', state: 'Odisha' },

  // April - Week 1: Kolkata & Siliguri
  { id: 'kolkata-apr-w1', name: 'Kolkata', state: 'West Bengal' },
  { id: 'siliguri-apr-w1', name: 'Siliguri', state: 'West Bengal' },
  // April - Week 2: Lucknow & Prayagraj
  { id: 'lucknow-apr-w2', name: 'Lucknow', state: 'Uttar Pradesh' },
  { id: 'prayagraj-apr-w2', name: 'Prayagraj', state: 'Uttar Pradesh' },
  // April - Week 3: Patna & Bhagalpur
  { id: 'patna-apr-w3', name: 'Patna', state: 'Bihar' },
  { id: 'bhagalpur-apr-w3', name: 'Bhagalpur', state: 'Bihar' },
  // April - Week 4: Chandigarh & Mohali
  { id: 'chandigarh-apr-w4', name: 'Chandigarh', state: 'Chandigarh' },
  { id: 'mohali-apr-w4', name: 'Mohali', state: 'Punjab' },

  // May - Week 1: Hyderabad & Visakhapatnam
  { id: 'hyderabad-may-w1', name: 'Hyderabad', state: 'Telangana' },
  { id: 'visakhapatnam-may-w1', name: 'Visakhapatnam', state: 'Andhra Pradesh' },
  // May - Week 2: Chennai & Coimbatore
  { id: 'chennai-may-w2', name: 'Chennai', state: 'Tamil Nadu' },
  { id: 'coimbatore-may-w2', name: 'Coimbatore', state: 'Tamil Nadu' },
  // May - Week 3: Bengaluru & Mysuru
  { id: 'bengaluru-may-w3', name: 'Bengaluru', state: 'Karnataka' },
  { id: 'mysuru-may-w3', name: 'Mysuru', state: 'Karnataka' },
  // May - Week 4: Kochi & Thiruvananthapuram
  { id: 'kochi-may-w4', name: 'Kochi', state: 'Kerala' },
  { id: 'thiruvananthapuram-may-w4', name: 'Thiruvananthapuram', state: 'Kerala' },
];

// Generate complete survey data
export const surveyData: SurveyData = {
  months: [
    {
      name: 'March',
      weeks: [
        { weekNumber: 1, cities: [cities[0], cities[1]] },
        { weekNumber: 2, cities: [cities[2], cities[3]] },
        { weekNumber: 3, cities: [cities[4], cities[5]] },
        { weekNumber: 4, cities: [cities[6], cities[7]] },
      ],
    },
    {
      name: 'April',
      weeks: [
        { weekNumber: 1, cities: [cities[8], cities[9]] },
        { weekNumber: 2, cities: [cities[10], cities[11]] },
        { weekNumber: 3, cities: [cities[12], cities[13]] },
        { weekNumber: 4, cities: [cities[14], cities[15]] },
      ],
    },
    {
      name: 'May',
      weeks: [
        { weekNumber: 1, cities: [cities[16], cities[17]] },
        { weekNumber: 2, cities: [cities[18], cities[19]] },
        { weekNumber: 3, cities: [cities[20], cities[21]] },
        { weekNumber: 4, cities: [cities[22], cities[23]] },
      ],
    },
  ],
  cityData: cities.reduce((acc, city, index) => {
    const monthIndex = Math.floor(index / 8);
    const weekIndex = Math.floor((index % 8) / 2);
    const monthName = ['March', 'April', 'May'][monthIndex];

    acc[city.id] = {
      city,
      month: monthName,
      week: weekIndex + 1,
      questions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(qId => generateQuestionData(city.id, qId)),
    };

    return acc;
  }, {} as Record<string, any>),
};

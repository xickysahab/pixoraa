import SectionWrapper from '../../common/section_wrapper';
import RevealText from '../../common/reveal_text';
import Eyebrow from '../../common/eyebrow';
import InsightCard from './insight_card';
import { insights, insightsIntro } from '../../data/insights';
import './insights.css';

export default function Insights() {
  return (
    <SectionWrapper id="journal" className="ins" label="Insights and stories">
      <header className="ins__head">
        <Eyebrow>{insightsIntro.label}</Eyebrow>
        <RevealText
          as="h2"
          lines={['Insights & stories.']}
          className="ins__heading sec-title"
        />
        <div className="ins__intro">
          <p>{insightsIntro.body}</p>
          <p className="ins__aside">{insightsIntro.aside}</p>
        </div>
      </header>

      <div className="ins__grid">
        {insights.map((post, i) => (
          <InsightCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}

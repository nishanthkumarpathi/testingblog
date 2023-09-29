import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [

  {
    title: 'Real-World Projects',
    Svg: require('@site/static/img/project.svg').default,
    description: (
    <>
    Explore Real-World Projects on my blog to bridge the gap between learning and practical application, unlocking tangible skills for the modern technological landscape
    </>
    ),
  },
    {
    title: 'Step-by-Step Tutorials',
    Svg: require('@site/static/img/process.svg').default,
    description: (
    <>
        Navigate the complexities of today's tech world with my detailed Step-by-Step Tutorials, turning daunting tasks into manageable projects.
    </>
    ),
  },
  {
    title: 'User Guides',
    Svg: require('@site/static/img/userguide.svg').default,
    description: (
    <>
        Master the intricacies of cutting-edge tools with my Technical User Guides, tailored to empower your tech journey from novice to expert.
    </>
    ),
  },
   
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 style={{ fontWeight: 'bold', textAlign: 'center', paddingBottom: '2rem' }}>
        Here's What My Blog Promises to Deliver to Enrich Your Tech-Savvy Journey
        </h2>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
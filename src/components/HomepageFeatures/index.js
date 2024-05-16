import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';    


const FeatureList = [
  {
    title: 'Developer Resources',
    Svg: require('@site/static/img/undraw_api.svg').default,
	linkTo: '',  
    	description: (
      <>
        <a href={"https://docs-app.dev-snowsoftware.io/ccmo/index.html"}>Snow Atlas API reference material</a>.
      </>
    ),
  }
];

function Feature({Svg, title, description, linkTo, href}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{renderTitle(...arguments)}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
function renderTitle({title, linkTo, href}){
  let feature = arguments[0];
  if (feature.linkTo && feature.linkTo.length > 0){
    return <Link to={feature.linkTo}>{feature.title}</Link>;
  } else if (feature.href && feature.href.length > 0){
    return <a href={feature.href}>{feature.title}</a>;
  }
  return feature.title;
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

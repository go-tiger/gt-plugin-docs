import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { gtPlugins } from '@site/plugins.config';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className='container'>
        <Heading as='h1' className='hero__title'>
          {siteConfig.title}
        </Heading>
        <p className='hero__subtitle'>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className='button button--secondary button--lg' to='/docs/intro'>
            시작하기
          </Link>
        </div>
      </div>
    </header>
  );
}

function PluginList() {
  return (
    <section className='container margin-vert--lg'>
      <div className='row'>
        {gtPlugins.map(p => (
          <div key={p.id} className='col col--4 margin-bottom--lg'>
            <div className='card shadow--md'>
              <div className='card__header'>
                <Heading as='h3'>{p.name}</Heading>
              </div>
              <div className='card__body'>
                <p>{p.summary}</p>
              </div>
              <div className='card__footer'>
                <div className='button-group button-group--block'>
                  <Link className='button button--primary button--sm' to={`/${p.id}/user/intro`}>
                    사용자
                  </Link>
                  <Link className='button button--secondary button--sm' to={`/${p.id}/dev/architecture`}>
                    개발자
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <PluginList />
      </main>
    </Layout>
  );
}

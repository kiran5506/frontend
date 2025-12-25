import FrontTheme from '@/theme/FrontTheme'
import React from 'react'

const WithLayout = (PageComponent, type) => {
  console.log(PageComponent);
  const WithLayoutComponent = (props) => {
    return (
        <>
            { type == 'frontend' ? (
                <FrontTheme>
                    <PageComponent {...props} />
                </FrontTheme>
            ) : (
                <PageComponent {...props} />
            )}
        </>
    )
  }
  return WithLayoutComponent;
}

export default WithLayout
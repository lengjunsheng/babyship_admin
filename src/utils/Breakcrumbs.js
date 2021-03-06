import NavLink from 'umi/navlink';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

// 更多配置请移步 https://github.com/icd2k3/react-router-breadcrumbs-hoc
const routes = [
  { path: '/', breadcrumb: '首页' },
  { path: '/teacher', breadcrumb: '师资团队' },
  { path: '/news', breadcrumb: '新闻资讯' },
  { path: '/issues', breadcrumb: 'bug收集' },
  { path: '/users', breadcrumb: '用户设计' },
  { path: '/roles', breadcrumb: '角色设计' },
  { path: '/modify', breadcrumb: '修改密码' },
];

export default withBreadcrumbs(routes)(({ breadcrumbs }) => (
  <div>
    {breadcrumbs.map((breadcrumb, index) => (
      <span key={breadcrumb.key}>
        <NavLink to={breadcrumb.props.match.url}>
          {breadcrumb}
        </NavLink>
        {(index < breadcrumbs.length - 1) && <i> / </i>}
      </span>
    ))}
  </div>
));

import React from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import { RiDashboardFill } from 'react-icons/ri';

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';

export default function AdminSidebar() {
  return (
    <>
      <ProSidebar>
        <SidebarHeader>
          {/**
           *  You can add a header for the sidebar ex: logo
           */}
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem icon={<RiDashboardFill />}>관리자 정보</MenuItem>
          </Menu>
          <Menu iconShape="square">
            <MenuItem icon={<RiDashboardFill />}>회원 목록</MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          {/**
           *  You can add a footer for the sidebar ex: copyright
           */}
        </SidebarFooter>
      </ProSidebar>
      ;
    </>
  );
}

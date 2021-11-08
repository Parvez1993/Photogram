import React from "react";
import { Header, Icon } from "semantic-ui-react";
import { useAuth } from "./Context";
import UploadModal from "./UploadModal";
import UserImageCollection from "./UserImageCollection";
import styled from "styled-components";
function Dashboard() {
  const [modalShow, setModalShow] = React.useState(false);

  const { images } = useAuth();
  return (
    <>
      <Wrapper>
        <div className="add">
          <Header
            as="h2"
            icon
            textAlign="center"
            onClick={() => setModalShow(true)}
          >
            <Icon name="add circle" />
            <Header.Content></Header.Content>
          </Header>
        </div>
      </Wrapper>

      <UploadModal show={modalShow} onHide={() => setModalShow(false)} />

      <UserImageCollection images={images} />
    </>
  );
}

const Wrapper = styled.div`
  .add {
    padding: 100px 0;
  }
`;
export default Dashboard;

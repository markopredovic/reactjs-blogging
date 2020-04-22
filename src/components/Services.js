import React from "react";
import { Card } from "react-bootstrap";
import img1 from "../assets/images/temp1.jpeg";
import img2 from "../assets/images/temp2.jpg";

const Services = () => {
  return (
    <div className="l-services">
      <Card className="mb-4">
        <Card.Img variant="top" src={img1} />
        <Card.Body>
          <Card.Title>Prodaja glista</Card.Title>
          <Card.Text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Accusantium inventore eum, architecto ipsum quia, obcaecati cum
            molestiae aut amet expedita nisi consequatur voluptates officiis
            aspernatur commodi aliquid, quasi iste ipsam enim cumque et
            exercitationem! Ea, quasi culpa nostrum officiis pariatur voluptate
            ducimus ad nihil delectus tempore dolorum! Dolor est magnam
            voluptatibus dolorem, eum quis maxime vitae illum nemo rem
            voluptates voluptas ratione perspiciatis expedita itaque accusantium
            recusandae autem iusto, odit blanditiis. Ad dignissimos doloribus
            enim sequi, mollitia odio soluta rem voluptate culpa quam placeat
            velit saepe possimus esse magnam id hic ipsa consectetur temporibus
            reprehenderit fugiat accusantium. Unde odit dignissimos fugit
            consectetur. Optio rerum veniam iusto, voluptatum nesciunt quis
            itaque laboriosam modi perferendis blanditiis, temporibus debitis
            qui dolor officia quia, magni obcaecati reprehenderit aperiam sunt.
            Dolorem harum culpa perferendis! Molestias optio dicta tempore,
            nihil totam ab magnam delectus aliquam alias voluptatibus eius
            impedit non pariatur, id odio! Unde, veritatis assumenda.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top" src={img2} />
        <Card.Body>
          <Card.Title>Konsultacije</Card.Title>
          <Card.Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            accusantium quas ipsa inventore, fugit vitae numquam esse nobis
            quibusdam, exercitationem minima assumenda at sequi quam similique
            ut eveniet facilis id molestias fuga. Libero, iusto nisi. Architecto
            quo nobis minima maxime optio doloribus, quae quia iure ea veniam
            suscipit commodi soluta. Repudiandae aut eveniet animi minima,
            provident nisi culpa odio nobis molestias assumenda. Cum adipisci
            obcaecati accusantium dolores incidunt eligendi dolorem eos
            voluptate eum unde rem, a atque amet voluptatem ullam consequuntur
            sint distinctio ipsam vero iure id at cupiditate itaque! Deleniti,
            delectus ea animi minus similique repudiandae, harum necessitatibus
            hic nam maiores at illo nemo rem cupiditate tenetur, fugit
            laudantium? Ipsam minima vel consequatur nihil, dolore eum dolorem
            architecto quae.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Services;

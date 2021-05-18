import React from 'react';
import { Card } from 'react-bootstrap';
import { FaArchive } from 'react-icons/fa';


export default function ProjectCard({project}) {
    return (
        <Card>
            {project}
        </Card>
    )
}
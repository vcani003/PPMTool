package com.coco.ppmtool.services;

import com.coco.ppmtool.domain.Project;
import com.coco.ppmtool.exceptions.ProjectIdException;
import com.coco.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project){
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return  projectRepository.save(project);
        }catch (Exception e){
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists");
        }
    }
    public Project findProjectByIdentifier(String projectId){
        Project project = projectRepository.findByProjectIdentifier(projectId);
        if (project == null){
            throw new ProjectIdException("Project ID '" + projectId + "' doesn't exist");
        }

        return project;
    }
}

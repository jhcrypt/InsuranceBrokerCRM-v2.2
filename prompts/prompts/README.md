# Prompt Chain System

This directory contains a comprehensive chain-based prompt system for managing the complete software development lifecycle. The system is organized into specialized chains that work together while maintaining clear responsibilities and integration points.

## Directory Structure

```
prompts/
├── chains/                     # Core chain implementations
│   ├── architecture_design_chain.md
│   ├── backend_development_chain.md
│   ├── code_quality_chain.md
│   ├── project_requirements_chain.md
│   ├── testing_chain.md
│   ├── ui_ux_chain.md
│   └── components/            # Chain components
│       ├── architecture/      # Architecture components
│       ├── backend/          # Backend components
│       ├── code_quality/     # Code quality components
│       ├── documentation/    # Documentation components
│       ├── meta/            # Meta information
│       ├── orchestration/    # Chain orchestration
│       ├── product_management/ # Product management
│       ├── requirements/    # Requirements components
│       ├── sprint_management/ # Sprint management
│       ├── system/         # System components
│       ├── testing/        # Testing components
│       ├── ui_ux/         # UI/UX components
│       └── utilities/     # Utility components
├── index.md                   # Chain index and usage guide
└── README.md                  # This file
```

## Available Commands

### Project Management Commands
1. `#new-project`
   - Initializes new project with SDLC setup
   - Creates project structure
   - Sets up documentation
   - Initializes Git repository

2. `#onboard`
   - Scans existing codebase
   - Analyzes project structure
   - Generates SDLC documentation
   - Sets up project tracking

3. `#start`
   - Continues from last sprint task
   - Loads sprint context
   - Updates progress tracking

4. `#sdlc-init`
   - Initializes SDLC framework
   - Generates context files
   - Creates implementation roadmap

5. `#status`
   - Displays current project status
   - Shows active tasks and progress
   - Lists pending items
   - Provides metrics and insights
   - Highlights blockers or issues

### Sprint & Story Management
6. `#new-sprint`
   - Starts new sprint
   - Creates sprint documentation
   - Updates roadmap

7. `#new-user-story`
   - Creates user story from template
   - Generates acceptance criteria
   - Updates project context

### Documentation Commands
8. `#update-doc`
   - Updates project documentation
   - Refreshes context files
   - Maintains documentation sync

9. `#gen-brd`
   - Generates Business Requirements Document
   - Captures objectives and criteria
   - Documents stakeholders

### Context Management
10. `#start-pair-programming`
    - Initializes pair programming session
    - Loads task context
    - Enables real-time collaboration

11. `#update-context`
    - Updates project context files
    - Propagates changes
    - Maintains consistency

12. `#sync-context`
    - Synchronizes context across agents
    - Resolves conflicts
    - Updates context files

13. `#analyze-context`
    - Performs deep analysis of current project context
    - Identifies patterns and relationships
    - Generates context insights
    - Suggests potential improvements

## Core Chains

1. Project Requirements Chain
   - Requirements lifecycle management
   - Feature specifications
   - Requirements maintenance

2. Architecture & Design Chain
   - System architecture
   - Component diagrams
   - API design

3. UI/UX Chain
   - Wireframe generation
   - Layout design
   - UI styling

4. Code Quality Chain
   - Code evaluation
   - Code improvement
   - Quality validation

5. Testing Chain
   - Unit testing
   - Performance testing
   - Test validation

6. Backend Development Chain
   - Server implementation
   - Database operations
   - API endpoints

## Chain Integration

Each chain is designed to work both independently and as part of the larger development workflow:
1. Chains communicate through shared artifacts
2. Clear dependencies between chains
3. Consistent documentation standards
4. Regular validation points

## Usage Guidelines

1. Start with the index.md for:
   - Complete chain documentation
   - Command reference
   - Integration guidelines
   - Usage workflows

2. Each chain provides:
   - Clear purpose and components
   - Specific commands
   - Integration points
   - Success criteria

3. Components provide:
   - Specific functionality
   - Clear interfaces
   - Documentation
   - Integration guides

## Best Practices

1. Chain Usage
   - Follow documented workflows
   - Use proper commands
   - Validate results
   - Maintain documentation

2. Component Integration
   - Follow interfaces
   - Handle errors
   - Document changes
   - Test integration

3. System Evolution
   - Regular updates
   - Clear documentation
   - Proper testing
   - Version control

## Note

This system is designed to be:
- Modular yet integrated
- Clear yet comprehensive
- Flexible yet structured
- Independent yet collaborative
- Maintainable yet extensible

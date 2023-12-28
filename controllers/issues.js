import Issue from '../models/Issue.js';

export const addIssue = async (req, res, next) => {
    try {
        const { name, description, location, assessment, username, date} = req.body;
        const issue = new Issue(name, description, location, assessment, username, date);
        await issue.addIssue();
        res.status(201).json( { message : 'Issue has been created successfully!' } );

    } catch (error) {
        res.status(400).json({message : error.message});

    }
};

export const getAllIssues = async (req, res, next) => {
    const [issues, _] = await Issue.getAllIssues();
    if (issues.length != 0) {
        res.status(200).json(issues);

    } else {
        res.status(404).json({message : 'No issues found!'});

    }
};

export const getAllUserIssues = async (req, res, next) => {
    const { username } = req.params;
    const [issues, _] = await Issue.getAllUserIssues(username);
    if (issues.length!= 0) {
        res.status(200).json(issues); 
    
    } else {
        res.status(404).json({message : 'No issues found!'});

    }
};

export const getIssueById = async (req, res, next) => {
    const { id } = req.params;
    const [issue, _] = await Issue.getIssueById(id);
    if (issue.length != 0) {
        res.status(200).json(issue[0]); 

    } else {
        res.status(404).json({message : 'Issue not found'});

    }
};

export const deleteIssue = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [result, _] = await Issue.deleteIssue(id);
        res.status(204).json({message : 'Issue deleted successfully!'});

    } catch(error) {
        res.status(404).json({message : error.message });

    }
};

export const updateIssueInfo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const info = req.body;
        await Issue.updateIssueInfo(id, info);
        res.status(200).json( { message : 'Issue has been updated successfully! ' } );

    } catch(error) {
        res.status(404).json({message : error.message });

    }
};

export const search = async (req, res, next) => {
    try {
        const fields = req.body;
        const [issues, _] = await Issue.search(fields);
        if (issues.length!= 0) {
            res.status(200).json(issues); 
        
        } else {
            res.status(404).json({message : 'Issue not found'});
            
        }

    } catch (error) {
        res.status(400).json({ menubar: error.message });
        
    }
};

export const getRecentIssues = async (req, res, next) => { 
    const [issues, _] = await Issue.getRecentIssues();
    if (issues.length != 0) {
        res.status(200).json(issues); 
    
    } else {
        res.status(404).json({message : 'No issues found'}); 
        
    }
}
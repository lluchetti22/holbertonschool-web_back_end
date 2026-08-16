#!/usr/bin/env python3
"""
Insert a document in Python
"""


def insert_school(mongo_collection, **kwargs):
    """
    Insert a new document in a collection based on kwargs.

    Args:
        mongo_collection: the pymongo collection object
        **kwargs: the fields and values of the document to insert

    Returns:
        the new _id of the inserted document
    """
    result = mongo_collection.insert_one(kwargs)
    return result.inserted_id
